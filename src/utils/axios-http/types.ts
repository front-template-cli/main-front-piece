/**
 * 请求服务配置参数
 */
export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean
  // 是否格式化请求参数时间;
  formatDate?: boolean
  // 是否格式化出参
  isTransformRequestResult?: boolean
  // 请求方式
  contentType?: string
  // 是否解析成JSON
  isParseToJson?: boolean
  // 是否统一处理Http异常信息
  isShowErrorMessage?: boolean
  // http错误信息的文本
  errorMessageText?: string
  // 是否同意处理业务异常信息
  isShowServerErrorMessage?: boolean
  // 业务错误信息的文本
  serverErrorMessage?: string
  // 是否设置请求超时
  isTimeout?: boolean
  // 请求超时时长（毫秒）
  timeoutNumber?: number
  // 是否忽略token
  ignoreToken?: boolean
}

/**
 * 服务出参参数
 */
export interface ResultParams<T = any> {
  code: number
  data?: T
  msg: string
}
