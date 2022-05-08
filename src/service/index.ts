import { BASE_URL, TIMEOUT } from './request/config'
import LLRequest from './request'

const llRequest = new LLRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例请求成功')
      return config
    },
    requestInterceptroCatch: (error) => {
      console.log('实例请求失败')
    },
    responseInterceptor: (res) => {
      console.log('实例响应成功')
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('实例响应失败')
    }
  }
})

export default llRequest
