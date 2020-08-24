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
        port:5002,
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
    }
}
