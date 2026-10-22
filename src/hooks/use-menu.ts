import { computed, type Component } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'

export interface MenuItem {
  titleKey: string
  path: string
  icon?: Component
}

/** 从路由表派生菜单，保证菜单与路由只有一份配置来源 */
export const useMenu = () => {
  const router = useRouter()

  const menuItems = computed<MenuItem[]>(() => {
    const items: MenuItem[] = []

    const walk = (routes: readonly RouteRecordRaw[]): void => {
      routes.forEach((route) => {
        const { titleKey, icon, hidden } = route.meta ?? {}

        if (titleKey && !hidden && route.name) {
          items.push({
            titleKey,
            path: router.resolve({ name: route.name }).path,
            icon,
          })
        }

        if (route.children?.length) {
          walk(route.children)
        }
      })
    }

    walk(router.options.routes)
    return items
  })

  return { menuItems }
}
