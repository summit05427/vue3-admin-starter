import { STORAGE_KEYS } from '@/constants/storage'
import { readJson, removeStorage } from '@/utils/storage'

interface PersistedAuthState {
  token?: string
}

// 只读的 token 存取层：请求层不依赖 auth store，写入由 auth store 的持久化插件完成
export const tokenProvider = {
  get: (): string => readJson<PersistedAuthState>(STORAGE_KEYS.token, {}).token ?? '',
  clear: (): void => removeStorage(STORAGE_KEYS.token),
}
