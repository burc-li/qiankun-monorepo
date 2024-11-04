const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,

  // 我们在 public-path.js 修改了 运行时 publicPath，这里是可以省略的
  // publicPath: process.env.NODE_ENV  === 'development' ? '/' : '/micro-apps/vue2-map-drilling/',

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
          // 当前模块的名称
          name: 'consumer',

          // 作为消费方，使用的时通过 ${remoteEntry}/${expose} 的方式使用， provider 是提供方 library 里的 name
          // remotes: {
          //   remoteEntry: 'provider@http://localhost:9000/remoteEntry.js',
          // },

          // 作为消费方，使用的时通过 ${remoteEntry}/${expose} 的方式使用， provider 是提供方 library 里的 name
          remotes: {
            remoteEntry: `promise new Promise(resolve => {
              const origin = window.location.origin
              // This part depends on how you plan on hosting and versioning your federated modules
              let remoteUrlWithVersion
              const NODE_ENV = origin.indexOf('localhost')>-1
              if(NODE_ENV){
                remoteUrlWithVersion = 'http://localhost:9000' + '/remoteEntry.js'
              }else{
                remoteUrlWithVersion = origin +'/public-app/remoteEntry.js'
              }
              const script = document.createElement('script')
              script.src = remoteUrlWithVersion
              script.onload = () => {
                // the injected script has loaded and is available on window
                // we can now resolve this Promise
                const proxy = {
                  get: (request) => window.provider.get(request),
                  init: (arg) => {
                    try {
                      return window.provider.init(arg)
                    } catch(e) {
                      console.log('remote container already initialized')
                    }
                  }
                }
                resolve(proxy)
              }
              // inject this script with the src set to the versioned remoteEntry.js
              document.head.appendChild(script);
            })
            `,
          },
        },
      ])
  },
})
