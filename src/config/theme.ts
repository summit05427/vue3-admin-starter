// 主题相关的常量，供 store、组合式函数和首屏脚本共同遵循同一套约定
// 持久化由 pinia-plugin-persistedstate 负责，键名见 STORAGE_KEYS.appState
export const THEME_MODES = ['light', 'dark', 'system'] as const

export type ThemeMode = (typeof THEME_MODES)[number]

export type ResolvedTheme = Exclude<ThemeMode, 'system'>

export const DEFAULT_THEME: ThemeMode = 'system'
