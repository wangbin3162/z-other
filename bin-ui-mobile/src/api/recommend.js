/**
 * 请求封装js(示例)
 */
import jsonp from '../common/util/jsonp'
import { options } from './config'

/**
 * 示例请求qq音乐接口slide
 * @return {Promise}
 */
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const recommendParam = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }
  return jsonp(url, recommendParam, options)
}
