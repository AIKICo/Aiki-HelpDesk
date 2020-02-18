module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer:{
    proxy:{
      '/api':{
        target: 'https://aiki-ticket-app.herokuapp.com',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}