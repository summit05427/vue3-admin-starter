// 对浏览器存储的安全封装：统一处理隐私模式、配额超限和反序列化异常
// 默认使用 localStorage；登录 token 传 sessionStorage，关闭标签页即失效

export const readRaw = (key: string, storage: Storage = window.localStorage): string | null => {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

export const writeRaw = (key: string, value: string, storage: Storage = window.localStorage): void => {
  try {
    storage.setItem(key, value)
  } catch {
    // 写入失败只影响持久化能力，不阻断主流程
  }
}

export const removeStorage = (key: string, storage: Storage = window.localStorage): void => {
  try {
    storage.removeItem(key)
  } catch {
    // 忽略删除失败
  }
}

/** 读取并反序列化 JSON，解析失败或数据不存在时返回兜底值 */
export const readJson = <T>(key: string, fallback: T, storage: Storage = window.localStorage): T => {
  const raw = readRaw(key, storage)
  if (!raw) {
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** 序列化后写入 JSON，序列化失败时放弃本次写入 */
export const writeJson = <T>(key: string, value: T, storage: Storage = window.localStorage): void => {
  try {
    writeRaw(key, JSON.stringify(value), storage)
  } catch {
    // 循环引用等序列化异常，直接跳过
  }
}
