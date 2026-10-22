import { http } from '../request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

// 模板占位接口：接入真实后端时替换路径与字段，并补齐刷新 token 等约定
export const login = (params: LoginParams): Promise<LoginResult> =>
  http.post<LoginResult>('/auth/login', params)

export const logout = (): Promise<void> => http.post<void>('/auth/logout')

export const getProfile = <TProfile>(): Promise<TProfile> => http.get<TProfile>('/auth/profile')
