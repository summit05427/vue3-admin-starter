// 跨业务复用的通用类型，业务私有类型就近定义

export type Nullable<T> = T | null

/** 分页请求的基础参数，具体接口可在此基础上扩展筛选字段 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** 分页响应的基础结构，对齐后端约定后可在此调整 */
export interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
