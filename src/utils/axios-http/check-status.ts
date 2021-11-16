/**
 * 接口响应编码逻辑处理
 * @param status
 * @param message
 */
import { notification } from 'ant-design-vue'

const _error = (message: string) =>
  notification.error({
    message,
    description: '提示'
  })

export function checkStatus(status: number, msg?: string): void {
  switch (status) {
    case 400:
      _error(msg || '网络请求超时！')
      break
    case 401:
      _error('用户没有权限（令牌、用户名、密码错误）!')
      // 未登录跳转至登录页面，并携带当前页面的路径
      // 登录成功后，
      break
    case 403:
      _error('用户得到授权，但是访问是被禁止的!')
      break
    case 404:
      _error('网络请求错误,未找到该资源!')
      break
    case 500:
      _error('服务器错误,请联系管理员!')
      break
    case 501:
      _error('网络未实现!')
      break
    case 502:
      _error('网络错误!')
      break
    case 503:
      _error('服务不可用，服务器暂时过载或维护!')
      break
    case 504:
      _error('网络超时!')
      break
    case 505:
      _error('http版本不支持该请求!')
      break
    default:
      _error(msg || '网络请求超时！')
  }
}
