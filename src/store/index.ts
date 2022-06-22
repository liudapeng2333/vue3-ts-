import { createStore, Store, useStore as useVuexStore } from 'vuex'

import accountLogin from './login/account-login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { IRootState, IStoreType } from './types'

import { listRequest } from '@/service/system/userList'

export const store = createStore<IRootState>({
  state() {
    return {
      name: 'liu',
      age: 25,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeDepartment(state, list) {
      state.entireDepartment = list
    },
    changeRole(state, list) {
      state.entireRole = list
    },
    changeMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    // 请求全局的部门和全局的角色
    async getInitialActionData({ commit }) {
      const departmentResult = await listRequest('department', {
        offset: 0,
        size: 1000
      })
      const roleResult = await listRequest('role', {
        offset: 0,
        size: 1000
      })
      const menuResult = await listRequest('menu', {})
      const { list: departmentList } = departmentResult.data
      const { list: roleList } = roleResult.data
      const { list: menuList } = menuResult.data

      commit('changeDepartment', departmentList)
      commit('changeRole', roleList)
      commit('changeMenu', menuList)
    }
  },
  modules: {
    accountLogin,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('accountLogin/loadLocalLogin')
  // 当用户退出后，继续初始化会发生token没有请求到的现象，不应在此初始化
  // store.dispatch('getInitialActionData')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
