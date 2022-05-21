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

// element-plus引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
setupStore()
app.use(router).mount('#app')
