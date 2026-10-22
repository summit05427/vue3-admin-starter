import type { Component } from 'vue'

// 扩展路由 meta 的字段，菜单、面包屑与后续守卫都从这里读取
declare module 'vue-router' {
  interface RouteMeta {
    /** i18n 词条 key，菜单、面包屑与页面标题统一从这里翻译 */
    titleKey?: string
    icon?: Component
    hidden?: boolean
    requiresAuth?: boolean
    roles?: string[]
    keepAlive?: boolean
    activeMenu?: string
  }
}
