import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { routeRecords } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeRecords,
  scrollBehavior: () => ({ top: 0 }),
})

setupRouterGuards(router)

export default router
