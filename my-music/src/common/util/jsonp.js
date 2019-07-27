/**
 * 依赖jsonp插件
 * npm install jsonp --save
 */
import originJsonp from 'jsonp';

/**
 * 封装jsonp方法拼接URL
 * @param url
 * @param data
 * @param option
 * @return {Promise}
 */
export default function jsonp (url, data, option) {
  // 拼接第一个?号
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  // 返回一个promise
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * 拼接URL参数
 * @param data
 * @return {string}
 */
function param (data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  // 把第一个&符去掉
  return url ? url.substring(1) : '';
}
