import llRequest from '../index'
import { IAccount, ILoginResult, IUserInfo, IUserMenu } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AcountLogin = '/login',
  RequestUser = '/users/',
  RequestUserMenu = '/role/'
}

export function accountLoginRequset(account: IAccount) {
  return llRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AcountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return llRequest.get<IDataType<IUserInfo>>({
    url: LoginAPI.RequestUser + id,
    isLoading: true
  })
}

export function requestUserMenuById(id: number) {
  return llRequest.get<IDataType<IUserMenu[]>>({
    url: LoginAPI.RequestUserMenu + id + '/menu',
    isLoading: true
  })
}
