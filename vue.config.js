'use strict'
const fs = require('fs')
const appRoot = process.cwd()

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        host:'localhost',
        hotOnly:true,
        disableHostCheck: true,
        https: true,
        port:5001,
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