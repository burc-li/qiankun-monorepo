import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import qiankun from 'vite-plugin-qiankun'

import { name as packageName } from './package.json'
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8003,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    lib: {
      name: `${packageName}-[name]`,
      formats: ['umd'],
    },
  },

  // 公共基础路径，等同 webpack 的 publicPath
  base: process.env.NODE_ENV === 'development' ? '/' : '/micro-apps/home/',

  // 这里的 'myMicroAppName' 是子应用名，主应用注册时AppName需保持一致
  plugins: [vue(), qiankun('vue3-pdf', { useDevMode: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true;@import (reference)"${path.resolve('src/assets/variable.less')}"`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
