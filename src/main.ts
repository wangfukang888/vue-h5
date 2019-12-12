import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'; 
import { NavBar, Loading, Toast, GridItem, Grid, Search, Icon } from 'vant';
import container  from './components/px-container.vue';

Vue.use(NavBar)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Grid).use(GridItem)
Vue.use(Search).use(Icon)

Vue.config.productionTip = false
Vue.component('nav-bar', NavBar)
Vue.component('load', Loading)
Vue.component('container', container)

Vue.prototype.toast = function(text: string) {
  return Toast( text )
}

router.beforeEach((to,from,next) => {
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
