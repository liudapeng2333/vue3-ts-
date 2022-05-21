import { ILoginState } from './login/types'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  accountLogin: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
