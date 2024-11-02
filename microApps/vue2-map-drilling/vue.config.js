const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // 我们在 public-path.js 修改了 运行时 publicPath，这里是可以省略的
  publicPath: process.env.NODE_ENV ? '/' : '/micro-apps/vue2-map-drilling/',

  devServer: {
    // port: 8002,
    port: process.env.VUE_APP_POST,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: 'umd',
      library: `${packageName}-[name]`,
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
})
