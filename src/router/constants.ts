// 路由名称集中登记，跳转时用常量引用，避免字符串散落在各处
export const ROUTE_NAMES = {
  home: 'home',
  login: 'login',
  forbidden: 'forbidden',
  notFound: 'not-found',
} as const
