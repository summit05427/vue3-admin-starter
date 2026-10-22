import { computed, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import type { ResolvedTheme, ThemeMode } from '@/config/theme'

// DOM 操作集中在这里，store 只维护状态，保持职责边界
const applyTheme = (theme: ResolvedTheme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/** 在应用启动时调用：立即应用一次主题，并在解析结果变化时同步到 DOM */
export const initTheme = (): void => {
  const appStore = useAppStore()
  watch(() => appStore.resolvedTheme, applyTheme, { immediate: true })
}

export const useTheme = () => {
  const appStore = useAppStore()

  return {
    theme: computed(() => appStore.theme),
    resolvedTheme: computed(() => appStore.resolvedTheme),
    setTheme: (mode: ThemeMode): void => appStore.setTheme(mode),
    toggleTheme: (): void => appStore.toggleTheme(),
  }
}
