import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import './assets/variable.less'
import './registerApps.js'


const app = createApp(App)

app.use(router)

app.mount('#app')
