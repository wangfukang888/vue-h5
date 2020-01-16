import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/tab-bar/home.vue'),
    meta: {
      index: 0,
      keepAlive: true,
      title: 'golo汽修大师'
    }
  },
  {
    path: '/fit',
    name: 'fit',
    component: () => import('../views/user/fit.vue'),
    meta: {
      index: 3,
      keepAlive: true,
      title: '设置'
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('../views/notfound.vue'),
    meta: {
      index: 1,
      keepAlive: false,
      title: '页面不存在'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue'),
    meta: {
      index: 0,
      keepAlive: false,
      title: '登录'
    }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/tab-bar/equipment.vue'),
    meta: {
      index: 1,
      keepAlive: true,
      title: '设备有问题'
    }
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: () => import('../views/plugin/pdf.vue'),
    meta: {
      index: 2,
      keepAlive: false,
      title: 'pdf预览'
    }
  },
  {
    path: '/reqair',
    name: 'reqair',
    component: () => import('../views/tab-bar/repair.vue'),
    meta: {
      index: 2,
      keepAlive: true,
      title: '修车有问题'
    }
  },
  {
    path: '/eq_install',
    name: 'eq_install',
    component: () => import('../views/eq_install/equipment_install.vue'),
    meta: {
      index: 3,
      keepAlive: true,
      title: '设备安装'
    }
  },
  {
    path: '/order_list',
    name: 'order_list',
    component: () => import('../views/order/order-list.vue'),
    meta: {
      index: 4,
      keepAlive: true,
      title: '历史记录'
    }
  },
  {
    path: '/order_detail/:id',
    name: 'order_detail',
    component: () => import('../views/order/order-detail.vue'),
    meta: {
      index: 5,
      keepAlive: true,
      title: '订单详情'
    }
  },
  {
    path: '/order_appeal/:id',
    name: 'order_appeal',
    component: () => import('../views/order/order-appeal.vue'),
    meta: {
      index: 7,
      keepAlive: true,
      title: '申诉详情'
    }
  },
  {
    path: '/order_ok/:id',
    name: 'order_ok',
    component: () => import('../views/order/order-success.vue'),
    meta: {
      index: 6,
      keepAlive: false,
      title: '发布成功'
    }
  }
]

// 需要与服务器路由匹配
const BASE_URL = process.env.NODE_ENV !== 'production' ? '/' : '/index/indexpro'

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: BASE_URL,
  routes
})

export default router
