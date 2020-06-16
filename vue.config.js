module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        host:'0.0.0.0',
        hot:true,
        disableHostCheck: true,
        https: false,
        proxy: {
            '/api': {
                target: 'https://aiki-ticket-app.herokuapp.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}