import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '@/config/app'

/** 页面标题跟随路由与语言变化，避免切换语言后标题仍是旧语言 */
export const useDocumentTitle = (): void => {
  const route = useRoute()
  const { t } = useI18n()

  watchEffect(() => {
    const titleKey = route.meta.titleKey
    document.title = titleKey ? `${t(titleKey)} - ${APP_NAME}` : APP_NAME
  })
}
