const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
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
      library: `${packageName}`,
    },
  },
})
