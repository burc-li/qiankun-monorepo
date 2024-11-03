const { defineConfig } = require('@vue/cli-service')

// 自动化注入
const fs = require('fs')
const MFROOT = './src/components'
const MFList = fs.readdirSync(MFROOT)
const exposes = {}
MFList.forEach(item => {
  exposes[`./${item}`] = `${MFROOT}/${item}`
})
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  // 设置 publicPath，要不然模块联邦报错 ChunkLoadError: Loading chunk xxx failed
  publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/public-app/',
  // publicPath: 'auto', // 设置 auto 也可以，自动推断在运行时的公共路径

  chainWebpack: config => {
    // 模块联邦 与 splitChunks冲突，关闭 splitChunks（代码分割）
    config.optimization.delete('splitChunks')

    // 模块联邦
    config
      .plugin('module-feaderation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [
        {
          // 当前模块的名称
          name: 'provider',
          library: { type: 'umd', name: 'provider' },

          // 构建输出的文件名，组件消费方引用：http://localhost:9000/remoteEntry.js
          filename: 'remoteEntry.js',

          // 作为提供方，暴露的组件
          exposes

          // 作为提供方，暴露的组件
          // exposes: {
          //   './Page404': './src/components/Page404',
          //   './CustomModal': './src/components/CustomModal'
          // }
        }
      ])
  }
})
