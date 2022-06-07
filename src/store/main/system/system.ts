import { Module } from 'vuex'
import { ItableState } from './types'
import { IRootState } from '../../types'
import { listRequest } from '@/service/system/userList'

const system: Module<ItableState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeusersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeusersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeroleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeroleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changegoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changegoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    }
  },
  actions: {
    async getPageList({ commit }, payload) {
      const pageData = await listRequest(payload.pageName, payload.queryInfo)
      const { list, totalCount } = pageData.data
      commit(`change${payload.pageName}List`, list)
      commit(`change${payload.pageName}Count`, totalCount)
    }
  }
}

export default system
