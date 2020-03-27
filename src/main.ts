import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import Cookie from './utils/cookie'
import { Toast, Lazyload, GridItem, Grid, Icon, Step, Steps, Cell, CellGroup, Field, Dialog } from 'vant'
import Container from 'base/container/container.vue'
import Loading from 'base/loading/loading.vue'
import ScrollView from 'base//scroll-view/scroll-view.vue'

import VConsole from 'vconsole'
new VConsole()

// 懒加载配置
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: require('img/img-load.png'),
  error: require('img/error-img.png')
})
Vue.use(Toast)
Vue.use(Grid).use(GridItem)
Vue.use(Icon)
Vue.use(Step).use(Steps)
Vue.use(Cell).use(CellGroup)
Vue.use(Field)
Vue.use(Dialog)

Vue.config.productionTip = false
Vue.component('loading', Loading)
Vue.component('container', Container)
Vue.component('scroll-view', ScrollView)

Vue.filter('formatPhone', function (p: string) {
  if (p) {
    return p.substring(0, 3) + '****' + p.substring(p.length - 4);
  }
})

Vue.prototype.$cookie = Cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
