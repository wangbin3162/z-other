import jsonp from '../common/util/jsonp';
import { getUid } from '../common/js/uid';
import { options } from './config';
import axios from 'axios';

// jsonp获取歌曲播放URL
export function getSongURL (songmid) {
  const url = ' https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  const data = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songmid,
    filename: `C400${songmid}.m4a`,
    guid: getUid()
  };

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }));
}

export function getLyric (songmid) {
  const url = '/api/getLyric';
  const lyricDataParam = {
    songmid: songmid,
    pcachetime: +new Date(),
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  };

  return axios.get(url, {
    params: lyricDataParam
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
