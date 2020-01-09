import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const str = localStorage.getItem('userInfo')
const userObj = str ? JSON.parse(str) : null
const token = userObj ? userObj.token : ''

export default new Vuex.Store({
  state: {
    token,
    nav_bar_t: '',
    userInfo: userObj, // 登录的信息
    is_cache_data: false, // 是否缓存数据
    is_refresh: false, // 是否需要刷新数据
    wx_info: {},
    install_info: new Array() // 暂存的安装信息
  },
  mutations: {
    get_login(state, userinfo) {
      localStorage.setItem('userInfo', JSON.stringify(userinfo))
      state.token = userinfo.token || ''
      state.userInfo = userinfo
    },
    get_bar(state, text) {
      state.nav_bar_t = text
    },
    cache_data(state, boolan) {
      state.is_cache_data = boolan
    },
    get_refresh(state, refresh) {
      state.is_refresh = refresh
    },
    install_info(state, arr) {
      state.install_info = arr
      console.log(state.install_info)
    }
  },
  actions: {
  },
  modules: {
  }
})
