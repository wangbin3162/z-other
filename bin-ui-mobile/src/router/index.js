import Vue from 'vue'
import Router from 'vue-router'

// 动态路由
const indexListDefault = (resolve) => {
  import('@/components/examples/index-list-default/demo').then(module => {
    resolve(module)
  })
}
const indexListCustomer = (resolve) => {
  import('@/components/examples/index-list-customer/demo').then(module => {
    resolve(module)
  })
}
const loading = (resolve) => {
  import('@/components/examples/loading/demo').then(module => {
    resolve(module)
  })
}
const scroll = (resolve) => {
  import('@/components/examples/scroll/demo').then(module => {
    resolve(module)
  })
}
const slide = (resolve) => {
  import('@/components/examples/slide/demo').then(module => {
    resolve(module)
  })
}
const fullPageSlide = (resolve) => {
  import('@/components/examples/full-page-slide/demo').then(module => {
    resolve(module)
  })
}
const fullPages = (resolve) => {
  import('@/components/examples/full-pages/demo').then(module => {
    resolve(module)
  })
}
const progress = (resolve) => {
  import('@/components/examples/progress/demo').then(module => {
    resolve(module)
  })
}
const popup = (resolve) => {
  import('@/components/examples/popup/demo').then(module => {
    resolve(module)
  })
}
const dialog = (resolve) => {
  import('@/components/examples/dialog/demo').then(module => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/indexListDefault',
      component: indexListDefault
    },
    {
      path: '/indexListCustomer',
      component: indexListCustomer
    },
    {
      path: '/loading',
      component: loading
    },
    {
      path: '/scroll',
      component: scroll
    },
    {
      path: '/slide',
      component: slide
    },
    {
      path: '/fullPageSlide',
      component: fullPageSlide
    },
    {
      path: '/fullPages',
      component: fullPages
    },
    {
      path: '/progress',
      component: progress
    },
    {
      path: '/popup',
      component: popup
    },
    {
      path: '/dialog',
      component: dialog
    }
  ]
})
