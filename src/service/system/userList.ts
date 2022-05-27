import llRequest from '../index'
import { IDataType } from '../types'

const userListURL = '/users/list'

export function userListRequset(queryInfo: any) {
  return llRequest.post<IDataType>({
    url: userListURL,
    data: queryInfo
  })
}

export function listRequest(pageName: string, queryInfo: any) {
  return llRequest.post<IDataType>({
    url: '/' + `${pageName}` + '/list',
    data: queryInfo
  })
}
