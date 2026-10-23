import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { resetUnauthorizedState } from '@/api/unauthorized'
import { tokenProvider } from '@/api/token'
import { STORAGE_KEYS } from '@/constants/storage'
import type { CurrentUser, LoginParams } from '@/api/modules/auth'

// 认证状态：token 持久化在当前标签页会话，用户资料每次刷新通过 /auth/me 恢复
export const useAuthStore = defineStore(
  'auth',
  () => {
    // 初始值由持久化插件在 store 创建时从 sessionStorage 恢复
    const token = ref('')
    const user = ref<CurrentUser | null>(null)

    const isLoggedIn = computed(() => token.value !== '')
    const username = computed(() => user.value?.username ?? '')
    const roles = computed(() => user.value?.roles ?? [])

    const setToken = (value: string): void => {
      token.value = value
      user.value = null
      // 同步写入存储，避免登录后立刻发起的 /auth/me 读不到新 token
      tokenProvider.set(value)
      resetUnauthorizedState()
    }

    const clearToken = (): void => {
      token.value = ''
      user.value = null
      tokenProvider.clear()
    }

    const login = async (params: LoginParams): Promise<void> => {
      // 动态引入请求层，避免 axios 进入首屏包体，只在实际登录时加载
      const { login: loginApi, getCurrentUser } = await import('@/api/modules/auth')
      const result = await loginApi(params)
      setToken(result.token)
      user.value = await getCurrentUser()
    }

    /**
     * 刷新页面后 token 还在但用户资料已丢失时调用。
     *
     * @returns 用户资料是否可用；失败时清空登录态，由路由守卫跳回登录页
     */
    const ensureCurrentUser = async (): Promise<boolean> => {
      if (!token.value) {
        return false
      }
      if (user.value) {
        return true
      }
      try {
        const { getCurrentUser } = await import('@/api/modules/auth')
        user.value = await getCurrentUser()
        return true
      } catch {
        clearToken()
        return false
      }
    }

    // 无状态 JWT 没有服务端登出，退出即丢弃本地凭证
    const logout = (): void => {
      clearToken()
    }

    return { token, user, isLoggedIn, username, roles, setToken, clearToken, login, logout, ensureCurrentUser }
  },
  {
    persist: {
      key: STORAGE_KEYS.token,
      // 只放当前标签页会话：关闭浏览器即失效，降低凭证长期驻留的风险
      storage: sessionStorage,
      pick: ['token'],
    },
  },
)
