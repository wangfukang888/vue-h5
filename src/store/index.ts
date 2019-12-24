import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav_bar_t: '',
    token: 'ea28b23ef404a553b9b226f1994ea977',
    wx_info: {},
    install_info: new Array(),
    select_info: null
  },
  mutations: {
    get_bar(state, text) {
      state.nav_bar_t = text
    },
    select_info(state, obj) {
      state.select_info = obj
    },
    install_info(state, arr) {
      state.install_info.push(arr)
      console.log(state.install_info)
    }
  },
  actions: {
  },
  modules: {
  }
})
