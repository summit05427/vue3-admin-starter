import { STORAGE_KEYS } from '@/constants/storage'
import { readJson, removeStorage, writeJson } from '@/utils/storage'

interface PersistedAuthState {
  token?: string
}

// 登录凭证使用 sessionStorage：与 auth store 的持久化配置保持同一份存储
const authStorage = (): Storage => window.sessionStorage

// 只读的 token 存取层：请求层不依赖 auth store，写入由 auth store 主动调用
export const tokenProvider = {
  get: (): string => readJson<PersistedAuthState>(STORAGE_KEYS.token, {}, authStorage()).token ?? '',
  // 登录拿到 token 后立即落盘，保证紧接着的 /auth/me 请求能带上 Authorization
  set: (token: string): void => writeJson(STORAGE_KEYS.token, { token }, authStorage()),
  clear: (): void => removeStorage(STORAGE_KEYS.token, authStorage()),
}
