import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import './registerServiceWorker'
import 'es6-promise/auto'
import axois from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import VueProgressBar from 'vue-progressbar'
import UUID from 'vue-uuid'
import { ValidationProvider } from 'vee-validate';

//import VueSignalR from '@latelier/vue-signalr'

const progressOptions = {
  color: '#fffe1d',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.6s',
    opacity: '0.6s',
    termination: 600
  },
  autoRevert: false,
  location: 'top',
  inverse: false
}

const  accessToken  =  localStorage.getItem('access_token')

Vue.config.productionTip  =  false
axois.defaults.baseURL = 'https://aiki-co-helpdesk-webapi.herokuapp.com/'
axois.defaults.headers.post['Content-Type'] = 'application/json';

if (accessToken) {
  axois.defaults.headers.post['Authorization'] =  accessToken
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

Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  vuetify,
  store,
  router,
  beforeCreate() {
    this.$vuetify.lang.current = 'fa';
    axois.interceptors.request.use(config => {
      this.$Progress.start();
      return config;
    }, function () {
      this.$Progress.fail();
    });

    axois.interceptors.response.use(response => {
      this.$Progress.finish();
      return response;
    }, function () {
      this.$Progress.fail();
    });
  },
  render: h => h(App)
}).$mount('#app')
