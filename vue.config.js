const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/vue-demo',
  devServer: {
    proxy: 'http://localhost:8080'
  }
})
