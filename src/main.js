import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import './registerServiceWorker'
import 'es6-promise/auto'
import Axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import VueProgressBar from 'vue-progressbar'
//import VueSignalR from '@latelier/vue-signalr'

const progressOptions = {
  color: '#fffe1d',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.6s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: false,
  location: 'top',
  inverse: false
}

const  accessToken  =  localStorage.getItem('access_token')

Vue.config.productionTip  =  false
Vue.prototype.$http  =  Axios;
Axios.defaults.baseURL = 'https://aiki-ticket-app.herokuapp.com/api';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] =  accessToken
}

//Vue.use(VueSignalR,'http://localhost:2025')
Vue.use(VueRouter)
Vue.use(VueProgressBar, progressOptions)

new Vue({
  vuetify,
  store,
  router,
  beforeCreate() {
    this.$vuetify.lang.current = 'fa';
    Axios.interceptors.request.use(config => {
      this.$Progress.start();
      return config;
    });

    Axios.interceptors.response.use(response => {
      this.$Progress.finish();
      return response;
    });
  },
  render: h => h(App)
}).$mount('#app')
