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
    userInfo: userObj,
    wx_info: {},
    install_info: new Array()
  },
  mutations: {
    get_login(state, userinfo) {
      localStorage.setItem('userInfo', JSON.stringify(userinfo))
      state.token = userinfo.token
    },
    get_bar(state, text) {
      state.nav_bar_t = text
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
