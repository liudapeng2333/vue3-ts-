import { Module } from 'vuex'
import { ItableState } from './types'
import { IRootState } from '../../types'
import {
  listRequest,
  createPageDataRequest,
  editPageDataRequest,
  deletePageDataRequest
} from '@/service/system/userList'

const system: Module<ItableState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0
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
    },
    changemenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changemenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    async getPageList({ commit }, payload) {
      const pageData = await listRequest(payload.pageName, payload.queryInfo)
      const { list, totalCount } = pageData.data
      commit(`change${payload.pageName}List`, list)
      commit(`change${payload.pageName}Count`, totalCount)
    },
    async creatBtnActions({ commit, dispatch }, payload: any) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      await createPageDataRequest(url, newData)

      dispatch('getPageList', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editBtnActions({ dispatch }, payload: any) {
      const { pageName, newData, id } = payload
      const url = `/${pageName}/${id}`
      await editPageDataRequest(url, newData)
      dispatch('getPageList', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async deleteBtnActions({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      await deletePageDataRequest(url)
      dispatch('getPageList', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default system
