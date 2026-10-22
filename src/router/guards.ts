import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { setUnauthorizedHandler } from '@/api/unauthorized'
import { useAuthStore } from '@/stores/auth'
import { ROUTE_NAMES } from './constants'

NProgress.configure({ showSpinner: false, trickleSpeed: 120 })

const resolveRedirect = (fullPath: string): string | undefined =>
  fullPath.startsWith('/login') ? undefined : fullPath

export const setupRouterGuards = (router: Router): void => {
  router.beforeEach((to) => {
    NProgress.start()

    const authStore = useAuthStore()

    // 未登录访问受限页面时跳转登录页，并携带回跳地址
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      return { name: ROUTE_NAMES.login, query: { redirect: to.fullPath } }
    }

    // 已登录用户不再停留在登录页
    if (to.name === ROUTE_NAMES.login && authStore.isLoggedIn) {
      return { name: ROUTE_NAMES.home }
    }

    return true
  })

  // 页面标题由 useDocumentTitle 监听路由与语言变化，这里只负责进度条收尾
  router.afterEach(() => {
    NProgress.done()
  })

  router.onError(() => {
    NProgress.done()
  })

  // 请求层发现 401 时通过这里跳登录，避免请求层直接依赖 router
  setUnauthorizedHandler(() => {
    const authStore = useAuthStore()
    authStore.clearToken()

    const redirect = resolveRedirect(router.currentRoute.value.fullPath)
    void router.replace({ name: ROUTE_NAMES.login, query: redirect ? { redirect } : undefined })
  })
}
