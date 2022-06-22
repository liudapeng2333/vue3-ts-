import { ILoginState } from './login/types'
import { ItableState } from './main/system/types'
import { IDashboard } from './main/analysis/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  accountLogin: ILoginState
  system: ItableState
  dashboard: IDashboard
}

export type IStoreType = IRootState & IRootWithModule
