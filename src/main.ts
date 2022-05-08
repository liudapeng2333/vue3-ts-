import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './service/axios_demo'
import lquest from './service'

// import ElementPlus from 'element-plus' // 全局引入样式
// import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// lquest.request<DataType>({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('请求中请求拦截成功')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('请求中响应拦截成功')
//       return res
//     }
//   }
// })

lquest
  .get<DataType>({
    url: '/home/multidata',
    isLoading: true,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求中请求拦截成功')
        return config
      },
      responseInterceptor: (res) => {
        console.log('请求中响应拦截成功')
        return res
      }
    }
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
  })
