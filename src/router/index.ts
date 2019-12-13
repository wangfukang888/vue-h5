import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      index: 0,
      keepAlive: true
    }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/equipment.vue'),
    meta: {
      index: 1,
      keepAlive: true,
      title: '设备有问题'
    }
  },
  {
    path: '/reqair',
    name: 'reqair',
    component: () => import('../views/repair.vue'),
    meta: {
      index: 2,
      keepAlive: false,
      title: '修车有问题'
    }
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('../views/QrScanner.vue'),
    meta: {
      index: 3,
      keepAlive: false,
      title: '扫码'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
