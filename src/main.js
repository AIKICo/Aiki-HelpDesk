import "babel-polyfill"
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import moment from "moment-jalaali";
import VueLodash from "vue-lodash";
import "./registerServiceWorker";
import "es6-promise/auto";
import axois from "axios";
import router from "./router";
import VueProgressBar from "vue-progressbar";
import * as firebase from "firebase/app";
import "firebase/analytics";
import Vue2TouchEvents from "vue2-touch-events";
import DynamicDirectives from "./directives/dynamicEvents";
import progressOptions from "./options/progressOptions";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import lodash from "lodash";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueNativeNotification from 'vue-native-notification'
import Splash from 'vue-splash';

//axois.defaults.baseURL = "https://localhost:5001/";
axois.defaults.baseURL = "https://aiki-co-helpdesk-webapi.herokuapp.com/";
axois.defaults.headers.common["Content-Type"] = "application/json";
axois.defaults.headers.common.Authorization = "Bearer " + store.state.accessToken;
axois.defaults.headers.common.CompanyID = store.state.companyId;

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueProgressBar, progressOptions);
Vue.use(VueMeta);
Vue.use(Vue2TouchEvents);
Vue.use(VueLodash, {name: "custom", lodash: lodash});
Vue.use(VueNativeNotification, {
    requestOnNotify: true
});

const toastOptions = {
    rtl: true
};
Vue.use(Toast, toastOptions);
Vue.use(Splash)

Vue.directive("DynamicEvents", DynamicDirectives);
Vue.component("date-picker", VuePersianDatetimePicker);

Vue.filter("formatDate", function (value) {
    if (value) {
        return moment(String(value)).format("YYYY/MM/DD");
    }
});

if (navigator.onLine) {
    const config = {
        apiKey: "AIzaSyCSuLmkyLa2KhAgPWxswwjcVOTDVjBYy94",
        projectId: "aiki-helpdesk-v1",
        appId: "1:185350520841:web:38306a62a0ab7b9b32b8d8",
        measurementId: "G-8CY0SWQXMJ"
    };
    firebase.initializeApp(config);
    //Vue.prototype.$analytics = firebase.analytics();
}

Vue.mixin({
    methods: {
        getStaticImage(image) {
            if (image !== "")
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
            if (!navigator.onLine) return;
            this.$Progress.start();
            return config;
        }, function () {
            this.$Progress.fail();
        });

        axois.interceptors.response.use(response => {
            if (response.status===201){
                Vue.$toast.success('اطلاعات ثبت گردید')
            }
            if (this) {
                if (this.$Progress) {
                    this.$Progress.finish();
                }
            }
            return response;
        }, async function (error) {
            if (!error.response)
            {
                Vue.$toast.error('ارتباط با شیکه میسر نمی باشد');
                return Promise.reject(error);
            }
                switch (error.response.status){
                case 400:
                    Vue.$toast.error(error.response.data.message);
                    break;
                case 401:
                    await store.dispatch('UserService/logout');
                    store.state.isLoggedIn = false;
                    localStorage.clear();
                    router.push("/login").catch(() => {
                    });
                    if (this) {
                        if (this.$Progress) {
                            this.$Progress.fail();
                        }
                    }
                    break;
                default:
                    if (this) {
                        if (this.$Progress) {
                            this.$Progress.fail();
                        }
                    }
            }
            if (error.response.data.includes('was not found in the key ring')){
                await store.dispatch('UserService/logout');
                store.state.isLoggedIn = false;
                localStorage.clear();
                router.push("/login").catch(() => {
                });
                if (this) {
                    if (this.$Progress) {
                        this.$Progress.fail();
                    }
                }
            }
            if (error.response.data.includes('was not found in the key ring')){
                Vue.$toast.error('به دلیل تعداد زیاد connectionها با بانک اطلاعاتی امکان برقراری ارتباط با سرور میسر نمی باشد');
                if (this) {
                    if (this.$Progress) {
                        this.$Progress.fail();
                    }
                }
            }
            return Promise.reject(error);
        });
    },
    create() {
        document.addEventListener('beforeunload', this.handlerClose);
    },
    methods: {
        handlerClose: function () {
            if (this.hasChanged) {
                console.log("Changes")
            } else {
                console.log("no changes");
            }
        },
    },
    render: h => h(App)
}).$mount("#app");

window.addEventListener('online', () => {
    Vue.$toast.success("ارتباط با سرویس دهنده برقرار گردید");
});

window.addEventListener('offline', () => {
    Vue.$toast.error("ارتباط با سرویس دهنده قطع گردید");
});
