export interface ApiErrorOptions {
  code?: number | string
  status?: number
}

/** 请求层统一抛出的错误类型，调用方可据此区分网络错误与业务错误 */
export class ApiError extends Error {
  readonly code: number | string
  readonly status?: number

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message)
    this.name = 'ApiError'
    this.code = options.code ?? 'UNKNOWN'
    this.status = options.status
  }
}
