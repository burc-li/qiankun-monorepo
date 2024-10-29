const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')
console.log('packageName', packageName)
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8001,
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
