import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { Toast, Lazyload, GridItem, Grid, Search, Icon, Step, Steps, Cell,  CellGroup, Field, Dialog } from 'vant'
import Container  from 'base/container/container.vue'
import Loading from 'base/loading/loading.vue'
import ScrollView from 'base//scroll-view/scroll-view.vue'
// import FastClick from 'fastclick'
// let f : any = FastClick
// f.attach(document.body)

// 懒加载配置
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: require('img/img-load.png'),
  error: require('img/error-img.png')
})
Vue.use(Toast)
Vue.use(Grid).use(GridItem)
Vue.use(Search).use(Icon)
Vue.use(Step).use(Steps)
Vue.use(Cell).use(CellGroup)
Vue.use(Field)
Vue.use(Dialog)

Vue.config.productionTip = false
Vue.component('loading', Loading)
Vue.component('container', Container)
Vue.component('scroll-view', ScrollView)

Vue.prototype.toast = function(text: string) {
  return Toast( text )
}
Vue.prototype.dialog = function() {
  return Dialog
}

router.beforeEach((to,from,next) => {
  // 防止找不到Promise router引发错误
  if (from.path == '/login') {
    return next()
  }
  if (to.path == '/' && !store.state.token){
    return next('/login')
  } 
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
