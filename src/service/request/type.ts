import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptroCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface LLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LLRequestInterceptors<T>
  isLoading?: boolean
}
