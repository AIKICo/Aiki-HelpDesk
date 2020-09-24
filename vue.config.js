'use strict'

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    devServer: {
        host:'localhost',
        hot:true,
        disableHostCheck: true,
        https: false,
        port:5003,
        proxy: {
            '/api': {
                target: 'https://aiki-ticket-app.herokuapp.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    pwa: {
        workboxOptions: {
            skipWaiting: true
        }
    },
    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
}
