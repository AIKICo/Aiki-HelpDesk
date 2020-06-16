module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        host:'localhost',
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