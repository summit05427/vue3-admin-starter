// 环境配置的唯一读取出口：业务代码从这里取配置，不直接访问 import.meta.env
const APP_ENVS = ['development', 'production'] as const

export type AppEnv = (typeof APP_ENVS)[number]

export interface AppEnvConfig {
  readonly title: string
  readonly appEnv: AppEnv
  readonly apiBaseUrl: string
  readonly apiTimeout: number
  readonly useMock: boolean
}

const DEFAULT_API_TIMEOUT = 10_000

/** 必填变量缺失时直接抛错，避免把错误配置带到运行时 */
const requireEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`[env] 缺少必填环境变量 ${key}，请检查当前环境对应的 .env 文件`)
  }
  return value
}

const isAppEnv = (value: string): value is AppEnv => APP_ENVS.some((item) => item === value)

const toPositiveNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const readEnv = (): AppEnvConfig => {
  const appEnv = requireEnv(import.meta.env.VITE_APP_ENV, 'VITE_APP_ENV')

  if (!isAppEnv(appEnv)) {
    throw new Error(`[env] VITE_APP_ENV 取值无效：${appEnv}，可选值为 ${APP_ENVS.join(' / ')}`)
  }

  return {
    title: requireEnv(import.meta.env.VITE_APP_TITLE, 'VITE_APP_TITLE'),
    appEnv,
    apiBaseUrl: requireEnv(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL'),
    apiTimeout: toPositiveNumber(import.meta.env.VITE_API_TIMEOUT, DEFAULT_API_TIMEOUT),
    useMock: import.meta.env.VITE_USE_MOCK === 'true',
  }
}

export const env: AppEnvConfig = Object.freeze(readEnv())
