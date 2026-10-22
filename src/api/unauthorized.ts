type UnauthorizedHandler = () => void

let handler: UnauthorizedHandler | null = null
// 并发请求同时返回 401 时只处理一次，避免重复跳转
let isHandled = false

/** 由路由层在启动时注册，请求层不直接依赖 router，避免循环引用 */
export const setUnauthorizedHandler = (nextHandler: UnauthorizedHandler): void => {
  handler = nextHandler
}

/** 重新登录或成功刷新登录态后调用，允许下一次 401 再次触发跳转 */
export const resetUnauthorizedState = (): void => {
  isHandled = false
}

export const notifyUnauthorized = (): void => {
  if (isHandled || !handler) {
    return
  }

  isHandled = true
  handler()
}
