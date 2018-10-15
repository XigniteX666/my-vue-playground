import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from'./getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flavor: '',
    count: 1,
    token: process.env.VUE_APP_SECRET,
    categories: {},
    product: {}
  },
  mutations,
  actions,
  getters
})
