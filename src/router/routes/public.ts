import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '../constants'

// 无需登录即可访问的路由，使用空布局
export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/layout/blank-layout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.login,
        component: () => import('@/views/login/index.vue'),
        meta: { titleKey: 'routes.login', hidden: true },
      },
    ],
  },
]
