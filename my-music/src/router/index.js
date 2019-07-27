import Vue from 'vue';
import Router from 'vue-router';
// 动态路由
const recommend = (resolve) => {
  import('@/components/r-recommend/r-recommend.vue').then(module => {
    resolve(module);
  });
};
const distList = (resolve) => {
  import('@/components/z-dist-list/z-dist-list.vue').then(module => {
    resolve(module);
  });
};

const singer = (resolve) => {
  import('@/components/r-singer/r-singer.vue').then(module => {
    resolve(module);
  });
};
const singerDetail = (resolve) => {
  import('@/components/z-singer-detail/z-singer-detail.vue').then(module => {
    resolve(module);
  });
};

const rank = (resolve) => {
  import('@/components/r-rank/r-rank.vue').then(module => {
    resolve(module);
  });
};
const topList = (resolve) => {
  import('@/components/z-top-list/z-top-list.vue').then(module => {
    resolve(module);
  });
};

const search = (resolve) => {
  import('@/components/r-search/r-search.vue').then(module => {
    resolve(module);
  });
};

const userCenter = (resolve) => {
  import('@/components/r-user-center/r-user-center.vue').then(module => {
    resolve(module);
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'// 默认跳转的
    },
    {
      path: '/recommend',
      component: recommend,  // 推荐
      children: [
        {
          path: ':id',
          component: distList
        }
      ]
    },
    {
      path: '/singer',
      component: singer,  // 歌手
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank,  // 排行
      children: [
        {
          path: ':id',
          component: topList
        }
      ]
    },
    {
      path: '/search',
      component: search,  // 搜索
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      component: userCenter
    }
  ]
});
