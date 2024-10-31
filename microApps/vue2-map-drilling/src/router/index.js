import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default () => {
  const base = window.__POWERED_BY_QIANKUN__ ? '/map/' : '/'

  return new VueRouter({
    routes,
    mode: 'history',
    base,
  })
}
