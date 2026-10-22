// 本地存储键统一登记，避免散落在各处的字符串
// 注意：index.html 首屏脚本需要同步读取 app-state 中的 theme，修改时需一并更新
export const STORAGE_KEYS = {
  appState: 'app-state',
  token: 'app-token',
} as const
