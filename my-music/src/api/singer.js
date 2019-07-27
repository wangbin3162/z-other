import jsonp from '../common/util/jsonp';
import { options } from './config';

// 获取歌手列表
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const singerParam = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 1326425897,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  };
  return jsonp(url, singerParam, options);
}

// 获取歌手详情,也就是歌手的所有歌曲
export function getSingerDetail (singerID, num) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const singerDetailParam = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    order: 'listen',
    songstatus: 1,
    singermid: singerID,
    begin: 0,
    num: num
  };
  return jsonp(url, singerDetailParam, options);
}
