import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, setupStore } from './store'

import 'normalize.css'
import './assets/css/index.less'
// import './service/axios_demo'
import lquest from './service'

// import ElementPlus from 'element-plus' // 全局引入样式
// import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).mount('#app')
setupStore()

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
