import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import createProvider from './apollo'
import i18n from '@/i18n/i18n';



Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
