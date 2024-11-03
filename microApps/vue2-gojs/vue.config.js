const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  // 我们在 public-path.js 修改了 运行时publicPath，这里是可以省略的
  // publicPath: process.env.NODE_ENV  === 'development' ? '/' : '/micro-apps/vue2-gojs/',

  devServer: {
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      libraryTarget: 'umd',
      library: `${packageName}`
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
})
