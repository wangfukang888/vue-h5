import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('../views/QrScanner.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/equipment.vue')
  },
  {
    path: '/reqair',
    name: 'reqair',
    component: () => import('../views/repair.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
      return saveTop
    } else {
      return {x: 0, y: 0}
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
