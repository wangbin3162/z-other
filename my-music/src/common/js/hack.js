/**
 * 全局设置nexttic函数在main.js引入vue之前引入
 */
function noop () {

}

window.MessageChannel = noop;
window.setImmediate = noop;
