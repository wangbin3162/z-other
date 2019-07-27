import jsonp from '../common/util/jsonp';
import { options } from './config';

// 获取热门搜索
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  // 热门搜索关键词参数
  const hotKeyParam = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  };
  return jsonp(url, hotKeyParam, options);
}

// 获取检索
export function search (query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  // 检索参数
  const searchParam = {
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all'
  };
  const data = Object.assign({}, searchParam, {
    w: query,
    p: page,
    perpage: perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0
  });
  return jsonp(url, data, options);
}
