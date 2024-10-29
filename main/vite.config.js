import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    headers:{
      'Access-Control-Allow-Origin':"*"
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars:{
          hack: `true;@import (reference)"${path.resolve('src/assets/variable.less')}"`
        },  
        javascriptEnabled: true,
      },
    },
  },
})
