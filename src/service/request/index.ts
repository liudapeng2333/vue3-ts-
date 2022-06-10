import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { LLRequestConfig, LLRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
// 单独引入loading样式
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true
class LLRequest {
  instance: AxiosInstance
  interceptors?: LLRequestInterceptors
  isLoading: boolean
  loading?: LoadingInstance
  constructor(config: LLRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.isLoading = config.isLoading ?? DEFAULT_LOADING

    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptroCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加一个loading
        if (this.isLoading) {
          this.loading = ElLoading.service({
            lock: true,
            fullscreen: true,
            text: 'loading................',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading去除
        this.loading?.close()
        // 对返回的数据进行进一步的封装
        const data = res.data

        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (error) => {
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (error.response.status === 404) {
          console.log('404的错误~')
        }
        return error
      }
    )
  }

  request<T>(config: LLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器，一般不常用
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.isLoading === false) {
        this.isLoading = config.isLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置true, 这样不会影响下一个请求
          this.isLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = DEFAULT_LOADING
          reject(error)
        })
    })
  }
  get<T>(config: LLRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }
  post<T>(config: LLRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }
  patch<T>(config: LLRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH'
    })
  }
  delete<T>(config: LLRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }
}

export default LLRequest
