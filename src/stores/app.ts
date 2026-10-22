import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePreferredDark } from '@vueuse/core'
import { STORAGE_KEYS } from '@/constants/storage'
import { DEFAULT_THEME, type ResolvedTheme, type ThemeMode } from '@/config/theme'
import { DEFAULT_LOCALE, type AppLocale } from '@/config/locale'

export const useAppStore = defineStore(
  'app',
  () => {
    // 用户选择的主题模式（light / dark / system），初始值由持久化插件在 store 创建时覆盖
    const theme = ref<ThemeMode>(DEFAULT_THEME)
    // 系统偏好由 @vueuse 监听，system 模式下据此实时解析
    const isSystemDark = usePreferredDark()

    const locale = ref<AppLocale>(DEFAULT_LOCALE)

    // 侧边栏折叠属于跨组件共享的布局状态，刷新后需要保持
    const isSidebarCollapsed = ref(false)
    // 移动端抽屉只在当前会话内有效，不做持久化
    const isMobileNavOpen = ref(false)

    const resolvedTheme = computed<ResolvedTheme>(() => {
      if (theme.value === 'system') {
        return isSystemDark.value ? 'dark' : 'light'
      }
      return theme.value === 'dark' ? 'dark' : 'light'
    })

    const setTheme = (mode: ThemeMode): void => {
      theme.value = mode
    }

    // 切换按钮在浅色/深色之间互切，主动选择后即退出 system 模式
    const toggleTheme = (): void => {
      setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
    }

    const toggleSidebar = (): void => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const setLocale = (nextLocale: AppLocale): void => {
      locale.value = nextLocale
    }

    const openMobileNav = (): void => {
      isMobileNavOpen.value = true
    }

    const closeMobileNav = (): void => {
      isMobileNavOpen.value = false
    }

    return {
      theme,
      resolvedTheme,
      locale,
      isSidebarCollapsed,
      isMobileNavOpen,
      setTheme,
      toggleTheme,
      setLocale,
      toggleSidebar,
      openMobileNav,
      closeMobileNav,
    }
  },
  {
    // 只持久化需要跨刷新保留的字段，移动端抽屉状态不落盘
    persist: {
      key: STORAGE_KEYS.appState,
      pick: ['theme', 'locale', 'isSidebarCollapsed'],
    },
  },
)
