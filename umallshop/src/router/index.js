import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: () => import('@/components/views/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/components/pages/home'),
          name: '首页'
        },
        {
          path: '/orderConfirm',
          component: () => import('@/components/pages/orderConfirm'),
          name: '订单确认'
        },
        {
          path: '/sort',
          component: () => import('@/components/pages/sort'),
          name: '商品分类'
        },
        {
          path: '/cart',
          component: () => import('@/components/pages/cart'),
          name: '购物车'
        },
        {
          path: '/mine',
          component: () => import('@/components/pages/mine'),
          name: '个人中心'
        },
        {
          path: '',
          redirect: '/home'
        },
      ]
    },
    {
      path: '/goodList',
      component: () => import('@/components/views/goodList'),
      name: '商品列表'
    },
    {
      path: '/goodDetail',
      component: () => import('@/components/views/goodDetail'),
      name: '商品详情'
    },
    {
      path: '/login',
      component: () => import('@/components/views/login'),
      name: '登录'
    },
    {
      path: '/register',
      component: () => import('@/components/views/register'),
      name: '注册'
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})


