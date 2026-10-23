import { http } from '../request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  tokenType: string
  expiresIn: number
}

export interface CurrentUser {
  username: string
  roles: string[]
}

// 后端接口约定见 docs/api-conventions.md，路径已包含 /api/v1 前缀，由 VITE_API_BASE_URL 提供
export const login = (params: LoginParams): Promise<LoginResult> =>
  http.post<LoginResult>('/auth/login', params)

// 刷新页面后用 token 换回用户名与角色，避免把用户资料长期落在浏览器里
export const getCurrentUser = (): Promise<CurrentUser> => http.get<CurrentUser>('/auth/me')
