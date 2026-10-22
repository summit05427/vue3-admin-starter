// 支持的语言与默认语言，持久化由 pinia-plugin-persistedstate 负责
export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'zh-CN'
