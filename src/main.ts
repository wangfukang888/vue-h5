import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { NavBar, Loading, Toast, GridItem, Grid, Search, Icon, Step, Steps, Cell,  CellGroup, Field, Dialog } from 'vant'
import container  from './components/px-container.vue'

// import FastClick from 'fastclick'
// let f : any = FastClick
// f.attach(document.body)

Vue.use(NavBar)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Grid).use(GridItem)
Vue.use(Search).use(Icon)
Vue.use(Step).use(Steps)
Vue.use(Cell).use(CellGroup)
Vue.use(Field)
Vue.use(Dialog)

Vue.config.productionTip = false
Vue.component('nav-bar', NavBar)
Vue.component('loading', Loading)
Vue.component('container', container)

Vue.prototype.toast = function(text: string) {
  return Toast( text )
}
Vue.prototype.dialog = function() {
  return Dialog
}

router.beforeEach((to,from,next) => {
  let obj : any = {
    path: '/login'
  }
  console.log(store.state.token)
  // 小坑， 防止找不到Promise router引发错误
  if (from.path == '/login') {
    return next()
  }
  if (to.path == '/' && !store.state.token){
    console.log('进入')
    return next('/login')
  } 
  
  next()
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
