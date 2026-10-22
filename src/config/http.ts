// 业务错误码与网络错误的默认文案，接入 i18n 后可改为按语言读取
export const SUCCESS_CODE = 0

export const DEFAULT_ERROR_MESSAGE = '请求失败，请稍后重试'
export const NETWORK_ERROR_MESSAGE = '网络异常，请检查网络连接'
export const TIMEOUT_ERROR_MESSAGE = '请求超时，请稍后重试'

export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数有误',
  401: '登录状态已失效，请重新登录',
  403: '没有访问权限',
  404: '请求的资源不存在',
  500: '服务器内部错误',
}

export const getHttpErrorMessage = (status?: number): string =>
  (status !== undefined ? HTTP_ERROR_MESSAGES[status] : undefined) ?? DEFAULT_ERROR_MESSAGE
