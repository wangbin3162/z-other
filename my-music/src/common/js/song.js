import { getSongURL, getLyric } from '../../api/song';
import { ERR_OK } from '../../api/config';
import { getUid } from '../../common/js/uid';
import { Base64 } from 'js-base64';

let urlMap = {};
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;// 专辑名称
    this.duration = duration;
    this.image = image;
    // 确保一首歌曲的 id 只对应一个 url
    if (urlMap[this.id]) {
      this.url = urlMap[this.id];
    } else {
      if (url) {
        this.url = url;
        urlMap[this.id] = url;
      } else {
        this._genUrl();
      }
    }
  }

  // 拼接歌曲地址URL
  _genUrl () {
    if (this.url) {
      return;
    }
    // 每次创建一个歌曲的时候异步调用获取并拼接播放地址
    getSongURL(this.mid).then((res) => {
      if (res.code === ERR_OK) {
        const vkey = res.data.items[0].vkey;
        const filename = res.data.items[0].filename;
        this.url = 'http://dl.stream.qqmusic.qq.com/';// 基础链接
        this.url += `${filename}`;
        this.url += `?vkey=${vkey}`;
        this.url += `&guid=${getUid()}`;
        this.url += '&uin=0&fromtag=66';
        urlMap[this.id] = this.url;
      }
    });
  }

  // 获取歌词
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    // 返回一个promise
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        // 注意这里返回的标志是retcode
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        } else {
          throw new Error('no lyric');
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

// 对外暴露一个创建歌曲的工厂方法,传入musicdata对象
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  });
}

// 处理歌手数组拼接
function filterSinger (singer) {
  let ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((item) => {
    ret.push(item.name);
  });
  return ret.join('/');
}
