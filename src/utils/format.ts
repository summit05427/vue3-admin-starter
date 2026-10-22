import dayjs from 'dayjs'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 显式声明可接受的输入类型，避免调用处传 any
type DateInput = string | number | Date | null | undefined

const isEmptyInput = (value: DateInput): boolean =>
  value === null || value === undefined || value === ''

/** 按日期格式输出，空值或非法值返回空字符串，便于表格直接展示 */
export const formatDate = (value: DateInput, pattern: string = DATE_FORMAT): string => {
  if (isEmptyInput(value)) {
    return ''
  }

  const instance = dayjs(value)
  return instance.isValid() ? instance.format(pattern) : ''
}

/** 按日期时间格式输出，空值或非法值返回空字符串 */
export const formatDateTime = (value: DateInput, pattern: string = DATE_TIME_FORMAT): string => {
  return formatDate(value, pattern)
}

/** 将字节数转换为可读体积，用于上传、附件等场景 */
export const formatFileSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const size = bytes / 1024 ** exponent

  return `${size.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent] ?? 'B'}`
}
