import type { RouteRecordRaw } from 'vue-router'
import { mainRoutes } from './main'
import { publicRoutes } from './public'

// 只做聚合，具体路由按模块拆分，新增模块时在此登记
export const routeRecords: RouteRecordRaw[] = [...publicRoutes, ...mainRoutes]
