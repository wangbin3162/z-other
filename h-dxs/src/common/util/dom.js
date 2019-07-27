// 确定当前浏览器前缀
let elementStyle = document.createElement('div').style;
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

/**
 * 自动适应浏览器添加适配属性如transform
 * @param style
 * @return {*}
 */
export function prefixStyle (style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

/**
 * 封装一个方法用于获取element的值
 * @param el
 * @param name
 * @param val
 * @return {string}
 */
export function getData (el, name, val) {
  const prefix = 'data-';
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}
