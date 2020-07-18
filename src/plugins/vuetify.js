import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import fa from 'vuetify/es5/locale/fa'

Vue.use(Vuetify, {
    lang: {
        locales: {fa},
        current: 'fa'
    },
});
export default new Vuetify({
    rtl: true,
    silent:false,
    lang: {
        locales: {fa},
        current: fa
    },
    theme: {
        dark: false
    },
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
});
