import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav_bar_t: ''
  },
  mutations: {
    get_bar(state, text) {
      state.nav_bar_t = text
    } 
  },
  actions: {
  },
  modules: {
  }
})
