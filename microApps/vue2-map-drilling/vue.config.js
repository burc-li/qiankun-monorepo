const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

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
          modifyVars: {
            hack: `true;@import (reference)"${path.resolve('src/assets/styles/variable.less')}"`,
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: config => {
    // 模块联邦
    config
      .plugin('module-feaderation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [
        {
          name: 'consumer',
          // 作为消费方，使用的时通过 ${remoteEntry}/${expose} 的方式使用
          remotes: {
            remoteEntry: 'provider@http://localhost:9000/remoteEntry.js',
          },
        },
      ])
  },
})
