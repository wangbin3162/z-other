// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import { formatDate } from './common/js/data'; // {} 表示导出的方法名
import './common/stylus/index.styl';

// 全局注册组件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.filter('formateDateFilter', function (time) {
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm');
});

let routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
];

// 指定选中的样式
let router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
