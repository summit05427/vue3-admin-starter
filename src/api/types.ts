export interface ApiResponse<T> {
  code: number
  data?: T
  message: string
  // 后端统一响应中的请求 ID，与响应头 X-Request-Id 一致，便于排查
  requestId?: string
}
