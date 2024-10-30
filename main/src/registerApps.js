import { registerMicroApps, start } from 'qiankun'
import microApps  from './microApps.js'

// 1. 在基座中注册子应用
registerMicroApps(
  microApps
)

start({})