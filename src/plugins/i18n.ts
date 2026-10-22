import type { App } from 'vue'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/zh-CN'
import enUS from '@/locales/en-US'
import { DEFAULT_LOCALE } from '@/config/locale'
import { useAppStore } from '@/stores/app'

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export const setupI18n = (app: App): void => {
  app.use(i18n)

  // store 是语言的唯一状态源：创建时持久化插件已恢复上次选择，这里同步初始值
  const appStore = useAppStore()
  i18n.global.locale.value = appStore.locale
  document.documentElement.lang = appStore.locale

  watch(
    () => appStore.locale,
    (locale) => {
      i18n.global.locale.value = locale
      document.documentElement.lang = locale
    },
  )
}
