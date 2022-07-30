const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/chat': {
        target: 'http://localhost:3030', // 后台接口
        changeOrigin: true //是否跨域
        // pathRewrite: {
        //   '^/admin': ''
        // }
      }
    }
  }
})
