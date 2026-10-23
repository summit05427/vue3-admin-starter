import type { RouteRecordRaw } from 'vue-router'
import { House } from '@lucide/vue'
import { ROUTE_NAMES } from '../constants'

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/default-layout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.home,
        component: () => import('@/views/home/index.vue'),
        // 首页默认要求登录，登录态由 auth store + /auth/me 恢复
        meta: { titleKey: 'routes.home', icon: House, requiresAuth: true },
      },
      {
        path: '403',
        name: ROUTE_NAMES.forbidden,
        component: () => import('@/views/error/ForbiddenView.vue'),
        meta: { titleKey: 'routes.forbidden', hidden: true },
      },
      {
        // 兜底路由放在主布局内，未匹配时仍保留导航能力
        path: ':pathMatch(.*)*',
        name: ROUTE_NAMES.notFound,
        component: () => import('@/views/error/NotFoundView.vue'),
        meta: { titleKey: 'routes.notFound', hidden: true },
      },
    ],
  },
]
