import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { resetUnauthorizedState } from '@/api/unauthorized'
import { STORAGE_KEYS } from '@/constants/storage'
import type { LoginParams } from '@/api/modules/auth'

// 认证状态的最小骨架：只管理凭证，用户资料按业务需要再扩展
export const useAuthStore = defineStore(
  'auth',
  () => {
    // 初始值由持久化插件在 store 创建时从 app-token 恢复
    const token = ref('')

    const isLoggedIn = computed(() => token.value !== '')

    const setToken = (value: string): void => {
      token.value = value
      resetUnauthorizedState()
    }

    const clearToken = (): void => {
      token.value = ''
    }

    const login = async (params: LoginParams): Promise<void> => {
      // 动态引入请求层，避免 axios 进入首屏包体，只在实际登录时加载
      const { login: loginApi } = await import('@/api/modules/auth')
      const result = await loginApi(params)
      setToken(result.token)
    }

    const logout = async (): Promise<void> => {
      try {
        if (token.value) {
          const { logout: logoutApi } = await import('@/api/modules/auth')
          await logoutApi()
        }
      } catch {
        // 退出接口失败也要清掉本地登录态，避免用户被困在已登录状态
      } finally {
        clearToken()
      }
    }

    return { token, isLoggedIn, setToken, clearToken, login, logout }
  },
  {
    // 只持久化 token，请求层通过 tokenProvider 读取同一份存储
    persist: {
      key: STORAGE_KEYS.token,
      pick: ['token'],
    },
  },
)
