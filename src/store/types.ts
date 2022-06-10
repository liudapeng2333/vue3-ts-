import { ILoginState } from './login/types'
import { ItableState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  accountLogin: ILoginState
  system: ItableState
}

export type IStoreType = IRootState & IRootWithModule
