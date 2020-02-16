import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import './registerServiceWorker'
import 'es6-promise/auto'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  created() {
    this.$vuetify.lang.current = 'fa'
  },
  render: h => h(App)
}).$mount('#app')
