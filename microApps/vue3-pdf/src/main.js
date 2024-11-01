import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

import { createApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
import './assets/index.css'
import './assets/variable.less'

let instance = null

// 顶层作用域，如果写在 render 函数内部，重新挂载会报错
const router = createRouter()

function render(props) {
  instance = createApp(App)

  instance.use(router)

  const container = props.container
  instance.mount(container ? container.querySelector('#app') : '#app')
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立启动子应用')
  render({})
  const ele = document.querySelector('.micro-app')
  ele.style.height = '100vh'
} else {
  renderWithQiankun({
    mount(props) {
      console.log('mount')
      render(props)
    },
    bootstrap() {
      console.log('bootstrap')
    },
    unmount() {
      instance.unmount()
      instance = null
    },
  })
}
