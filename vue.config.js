
module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        host:'localhost',
        hot:true,
        disableHostCheck: true,
        https: true,
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