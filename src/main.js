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
import UUID from 'vue-uuid'
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
Vue.use(UUID)

Vue.directive('DynamicEvents',{
  bind: function (el, binding, vnode) {
    const allEvents = binding.value;
    allEvents.forEach((event) => {
      // register handler in the dynamic component
      vnode.componentInstance.$on(event, (eventData) => {
        // when the event is fired, the proxyEvent function is going to be called
        vnode.context.proxyEvent(event, eventData);
      });
    });
  },
  unbind: function (el, binding, vnode) {
    vnode.componentInstance.$off();
  },
});

new Vue({
  vuetify,
  store,
  router,
  beforeCreate() {
    this.$vuetify.lang.current = 'fa';
    Axios.interceptors.request.use(config => {
      this.$Progress.start();
      return config;
    }, function () {
      this.$Progress.fail();
    });

    Axios.interceptors.response.use(response => {
      this.$Progress.finish();
      return response;
    }, function () {
      this.$Progress.fail();
    });
  },
  render: h => h(App)
}).$mount('#app')
