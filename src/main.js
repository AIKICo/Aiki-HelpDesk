import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import './registerServiceWorker'
import 'es6-promise/auto'
import Axios from 'axios'
//import VueSignalR from '@latelier/vue-signalr'

Vue.config.productionTip  =  false
Vue.prototype.$http  =  Axios;
const  accessToken  =  localStorage.getItem('access_token')
if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] =  accessToken
}

//Vue.use(VueSignalR,'http://localhost:2025')

new Vue({
  vuetify,
  store,
  created() {
    this.$vuetify.lang.current = 'fa';
  },
  render: h => h(App)
}).$mount('#app')
