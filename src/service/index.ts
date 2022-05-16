import { BASE_URL, TIMEOUT } from './request/config'
import localCache from '@/utils/cache'
import LLRequest from './request'

const llRequest = new LLRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getItem('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptroCatch: (error) => {
      console.log('实例请求失败')
      return error
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('实例响应失败')
      return error
    }
  }
})

export default llRequest
