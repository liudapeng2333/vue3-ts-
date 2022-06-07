import llRequest from '../index'
import { IDataType } from '../types'

export function listRequest(pageName: string, queryInfo: any) {
  return llRequest.post<IDataType>({
    url: '/' + `${pageName}` + '/list',
    data: queryInfo
  })
}
