/**
 * 请求结果返回码
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  NO_AUTH = 401
}

/**
 * 请求方法
 */

export enum RequestTypeEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export enum ContentTypeEnum {
  // JSON
  JSON = 'application/json;charset=UTF-8',
  // Text
  Text = 'text/plain;charset=UTF-8',
  // form-data 上传
  FORM_DATA = 'application/x-www-form-urlencoded',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8'
}
