import { createStore, Store, useStore as useVuexStore } from 'vuex'
import accountLogin from './login/account-login'
import system from './main/system/system'
import { IRootState, IStoreType } from './types'

import { listRequest } from '@/service/system/userList'

export const store = createStore<IRootState>({
  state() {
    return {
      name: 'liu',
      age: 25,
      entireDepartment: [],
      entireRole: []
    }
  },
  getters: {},
  mutations: {
    changeDepartment(state, list) {
      state.entireDepartment = list
    },
    changeRole(state, list) {
      state.entireRole = list
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
      const { list: departmentList } = departmentResult.data
      const { list: roleList } = roleResult.data

      commit('changeDepartment', departmentList)
      commit('changeRole', roleList)
    }
  },
  modules: {
    accountLogin,
    system
  }
})

export function setupStore() {
  store.dispatch('accountLogin/loadLocalLogin')
  store.dispatch('getInitialActionData')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
