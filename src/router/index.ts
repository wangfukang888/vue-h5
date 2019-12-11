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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import(/* webpackChunkName: "about" */ '../views/equipment.vue')
  },
  {
    path: '/reqair',
    name: 'reqair',
    component: () => import(/* webpackChunkName: "about" */ '../views/repair.vue')
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
