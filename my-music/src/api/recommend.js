import jsonp from '../common/util/jsonp';
import { options } from './config';

import axios from 'axios';

// 封装api获取推荐slider
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const param = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  };
  return jsonp(url, param, options);
}

// 服务端代理获取歌单列表
export function getDistList () {
  const url = '/api/getDistList';
  const discListParam = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: {
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': {'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8},
        'module': 'playlist.PlayListPlazaServer'
      }
    }
  };
  return axios.get(url, {
    params: discListParam
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

// 封装api获取推荐s歌曲列表
export function getSongList (dissid) {
  const url = '/api/getSongList';
  const discSongParam = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    format: 'json',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  };
  const data = Object.assign({}, discSongParam, options, {
    disstid: dissid
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
