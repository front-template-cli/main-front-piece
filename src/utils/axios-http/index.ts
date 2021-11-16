import { RequestOptions, ResultParams } from './types'
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError
} from 'axios'
import { ContentTypeEnum, ResultEnum, RequestTypeEnum } from './http-enum'
import { createStorage } from '../storage'
import { CookieKeyEnum } from '../../config/const-enum'
import { checkStatus } from './check-status'
import store from '../../store'

// 环境变量
const isDev = process.env.NODE_ENV === 'development'
const Storage = createStorage({ storage: localStorage })
const handleError = (err: AxiosError) => {
  const _code = err.code ? parseInt(err.code) : 500
  // 开发环境打印错误信息
  if (isDev) {
    console.error(`===status:${_code};===errorMessageText:${err?.message}`)
  }
  checkStatus(_code, err?.message)
}

class VAxios {
  private readonly options: RequestOptions

  private instance: AxiosInstance | undefined

  constructor(options: RequestOptions) {
    this.options = options
  }

  /**
   * axios的请求主体
   * @param configs
   * @param options
   */
  request<T = any>(
    configs: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<AxiosResponse<ResultParams>> {
    store.dispatch('setLoading', { loading: true, loadingText: '请求中' })
    this.instance = axios.create()
    // 默认配置
    this.instance.defaults.headers.post['Content-Type'] = ContentTypeEnum.JSON
    this.instance.defaults.method = RequestTypeEnum.GET
    const _conf: AxiosRequestConfig = JSON.parse(JSON.stringify(configs))
    const _opts: RequestOptions = Object.assign({}, this.options, options)
    // 格式化接口地址
    _conf.url = _conf?.url?.startsWith('http')
      ? _conf?.url
      : `${location.origin}/${_conf?.url}`

    const {
      contentType,
      isShowErrorMessage,
      errorMessageText,
      isTransformRequestResult,
      isShowServerErrorMessage,
      isTimeout,
      timeoutNumber,
      ignoreToken
    } = _opts
    if (contentType) {
      this.instance.defaults.headers.post['Content-Type'] = contentType
    }
    // 是否需要设置超时时长
    if (isTimeout) {
      this.instance.defaults.timeout = timeoutNumber
    }
    // request拦截器
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const { headers } = config
      // 是否忽略 token 校验
      if (!ignoreToken && headers) {
        headers.Authorization = Storage.getCookie(CookieKeyEnum.AuthToken) || ''
      }
      return config
    }, undefined)
    // response拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse<ResultParams>) => {
        store.dispatch('setLoadingText', '解析中...')
        const { data, config } = res
        if (data.code === ResultEnum.SUCCESS) {
          store.dispatch('setLoading', { loading: false })
          // 是否需要格式化接口出参
          if (isTransformRequestResult) {
            return Promise.resolve(data.data)
          } else {
            return Promise.resolve(data)
          }
        } else {
          store.dispatch('setLoading', { loading: false })
          // 是否统一处理业务异常
          if (isShowServerErrorMessage) {
            handleError({
              code: data.code.toString(),
              config: config,
              isAxiosError: false,
              message: errorMessageText || data?.msg,
              name: '',
              response: res,
              toJSON: () => {
                return {}
              }
            })
          }
          return Promise.reject(res)
        }
      },
      (err: AxiosError) => {
        store.dispatch('setLoading', { loading: false })
        // 是否统一处理http接口请求异常
        if (isShowErrorMessage) {
          const { data, statusText } = err.response as AxiosResponse

          handleError({
            ...err,
            code: err.response?.status.toString(),
            message: errorMessageText || data?.msg || statusText
          })
        }
        return Promise.reject(err.response)
      }
    )
    // 接口请求
    return this.instance.request<T, AxiosResponse<ResultParams>>(_conf)
  }
}

/**
 * 请求类接口实现
 */
const Http = new VAxios({
  contentType: ContentTypeEnum.JSON,
  errorMessageText: '',
  formatDate: false,
  ignoreToken: false,
  isParseToJson: true,
  isShowErrorMessage: true,
  isShowServerErrorMessage: true,
  isTimeout: true,
  isTransformRequestResult: true,
  joinParamsToUrl: false,
  serverErrorMessage: '',
  timeoutNumber: 5000
})
export default Http
