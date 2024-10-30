import './public-path.js'

import { createApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
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

if (!window.__POWERED_BY_QIANKUN__) {
  console.log('独立启动子应用')
  render({})
  const ele = document.querySelector('.micro-app')
  ele.style.height = '100vh'
}


export async function bootstrap () {
  console.log('react app bootstraped')
}

export async function mount (props) {
  render(props)
}

export async function unmount (props) {
  app.unmount()
  app = null
}

export async function update (props) {
  console.log('update props', props)
}

