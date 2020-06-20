import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify";
import store from "./store"
import VueRouter from "vue-router"
import VueMeta from "vue-meta"
import moment from "moment-jalaali"
import VueLodash from "vue-lodash"
import "./registerServiceWorker"
import "es6-promise/auto"
import axois from "axios"
import router from "./router"
import VueProgressBar from "vue-progressbar"
import {ValidationProvider} from "vee-validate";
import * as firebase from "firebase/app"
import "firebase/analytics"
import Vue2TouchEvents from "vue2-touch-events";
import DynamicDirectives from "./directives/dynamicEvents"
import progressOptions from "./options/progressOptions";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import lodash from "lodash"
//import VueSignalR from "@latelier/vue-signalr"
const accessToken = localStorage.getItem("access_token");
const companyid = localStorage.getItem("companyid");

axois.defaults.baseURL = "https://aiki-co-helpdesk-webapi.herokuapp.com/";
axois.defaults.headers.common["Content-Type"] = "application/json";
if (accessToken) {
    axois.defaults.headers.common["Authorization"] = accessToken;
    axois.defaults.headers.common["CompanyID"] = companyid;
}

Vue.config.productionTip = false;
//Vue.use(VueSignalR,"http://localhost:2025")
Vue.use(VueRouter);
Vue.use(VueProgressBar, progressOptions);
Vue.use(VueMeta);
Vue.use(Vue2TouchEvents);
Vue.use(VueLodash, { name: "custom" , lodash: lodash })

Vue.directive("DynamicEvents", DynamicDirectives);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("date-picker", VuePersianDatetimePicker);

Vue.filter("formatDate", function (value) {
    if (value) {
        return moment(String(value)).format("YYYY/MM/DD")
    }
})

Vue.config.productionTip = false;
var config = {
    apiKey: "AIzaSyCSuLmkyLa2KhAgPWxswwjcVOTDVjBYy94",
    projectId: "aiki-helpdesk-v1",
    appId: "1:185350520841:web:38306a62a0ab7b9b32b8d8",
    measurementId: "G-8CY0SWQXMJ"
};
firebase.initializeApp(config);
Vue.prototype.$analytics = firebase.analytics();

Vue.mixin({
    methods: {
        getStaticImage(image) {
            if (image != "")
                return require(`./assets/${image}`);
            else {
                return "";
            }
        }
    }
});

new Vue({
    vuetify,
    store,
    router,
    beforeCreate() {
        this.$vuetify.lang.current = "fa";
        axois.interceptors.request.use(config => {
            this.$Progress.start();
            return config;
        }, function () {
            this.$Progress.fail();
        });

        axois.interceptors.response.use(response => {
            this.$Progress.finish();
            return response;
        }, function (error) {
            console.log(error); // Log into RavenDB
            this.$Progress.fail();
        });
    },
    render: h => h(App)
}).$mount("#app");
