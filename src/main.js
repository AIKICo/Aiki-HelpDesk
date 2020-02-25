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
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import VueMeta from 'vue-meta'
//import VueSignalR from '@latelier/vue-signalr'

const progressOptions = {
  color: '#fffe1d',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.5s',
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
Vue.use(VueMeta)

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

Vue.config.productionTip = false
var config = {
  apiKey: 'AIzaSyCSuLmkyLa2KhAgPWxswwjcVOTDVjBYy94',
  projectId: 'aiki-helpdesk-v1',
  appId: '1:185350520841:web:38306a62a0ab7b9b32b8d8',
  measurementId: 'G-8CY0SWQXMJ'
}
firebase.initializeApp(config)
Vue.prototype.$analytics = firebase.analytics();

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
