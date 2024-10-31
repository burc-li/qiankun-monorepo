import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

import { createApp } from 'vue'
import App from './App.vue'
import createRouter from './router';
import './assets/index.css'
import './assets/variable.less'

let app
let router
function render(props) {
  app = createApp(App)
  router = createRouter()
  app.use(router)

  const container = props.container
  app.mount(container ? container.querySelector('#app') : '#app')
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立启动子应用')
  render({})
  const ele = document.querySelector('.micro-app')
  ele.style.height = '100vh'
}else{
  renderWithQiankun({
    mount(props) {
      render(props)
    },
    bootstrap() {
      console.log('bootstrap')
    },
    unmount() {
      console.log('unmount')
      app.unmount()
      app = null
      router = null
    },
  })
}


