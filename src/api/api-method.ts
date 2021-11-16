import { RequestTypeEnum } from '../utils/axios-http/http-enum'
import request from '../utils/axios-http/index'

export const getApi = () => {
  return request.request({
    method: RequestTypeEnum.GET,
    url: 'coudMusicApi/countries/code/list'
  })
}
