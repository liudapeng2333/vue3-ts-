import llRequest from '../index'
import { IDataType } from '../types'

export function listRequest(pageName: string, queryInfo: any) {
  return llRequest.post<IDataType>({
    url: '/' + `${pageName}` + '/list',
    data: queryInfo
  })
}

export function createPageDataRequest(url: string, newData: object) {
  return llRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageDataRequest(url: string, newData: object) {
  return llRequest.patch<IDataType>({
    url: url,
    data: newData
  })
}

export function deletePageDataRequest(url: string) {
  return llRequest.delete<IDataType>({
    url: url
  })
}
