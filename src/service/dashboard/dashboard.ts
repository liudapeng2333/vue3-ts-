import llRequest from '../index'
import { IDataType } from '../types'

enum DashboardApi {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return llRequest.get<IDataType>({
    url: DashboardApi.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return llRequest.get<IDataType>({
    url: DashboardApi.categoryGoodsSale
  })
}
export function getCagegoryGoodsFavor() {
  return llRequest.get<IDataType>({
    url: DashboardApi.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return llRequest.get<IDataType>({
    url: DashboardApi.addressGoodsSale
  })
}
