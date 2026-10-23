import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { toast } from 'vue-sonner'
import { env } from '@/config/env'
import { HTTP_STATUS } from '@/constants/http'
import {
  DEFAULT_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  SUCCESS_CODE,
  TIMEOUT_ERROR_MESSAGE,
  getHttpErrorMessage,
} from '@/config/http'
import { ApiError } from './error'
import { tokenProvider } from './token'
import { notifyUnauthorized } from './unauthorized'
import type { ApiResponse } from './types'

const TIMEOUT_ERROR_CODE = 'ECONNABORTED'

const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
})

httpClient.interceptors.request.use((config) => {
  const token = tokenProvider.get()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiResponse<unknown> | undefined

    // 非约定结构的响应（如文件流）不做业务码校验，由调用方单独处理
    if (!payload || typeof payload.code !== 'number') {
      return response
    }

    if (payload.code !== SUCCESS_CODE) {
      const message = payload.message || DEFAULT_ERROR_MESSAGE
      toast.error(message)
      return Promise.reject(new ApiError(message, { code: payload.code, status: response.status }))
    }

    return response
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    // 主动取消的请求不上报错误，避免切换页面时弹出无意义提示
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const status = error.response?.status

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      // 401 只清理登录态并交给路由处理，不额外弹提示避免重复打扰
      tokenProvider.clear()
      notifyUnauthorized()
      return Promise.reject(new ApiError(getHttpErrorMessage(status), { status }))
    }

    const message =
      error.code === TIMEOUT_ERROR_CODE
        ? TIMEOUT_ERROR_MESSAGE
        : status
          ? getHttpErrorMessage(status)
          : NETWORK_ERROR_MESSAGE

    toast.error(message)
    return Promise.reject(new ApiError(message, { status, code: error.code }))
  },
)

/** 统一请求入口：返回值直接是契约中的 data，失败时抛出 ApiError */
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await httpClient.request<ApiResponse<T>>(config)
  // 后端成功响应必定带 data；无返回值的接口（如删除）在调用处声明为 void
  return response.data.data as T
}

// 简写方法固定 url / method，避免调用处覆盖，其余配置保持可扩展
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, url, method: 'GET' }),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, url, method: 'POST', data }),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, url, method: 'PUT', data }),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, url, method: 'DELETE' }),
}
