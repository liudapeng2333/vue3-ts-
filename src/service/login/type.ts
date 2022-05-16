export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}

export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}
interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}

interface Department {
  id: number
  name: string
  parentId?: any
  createAt: Date
  updateAt: Date
  leader: string
}

interface Child {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children?: any
  parentId: number
}

export interface IUserMenu {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: Child[]
}
