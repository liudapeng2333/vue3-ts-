import { createStore, Store, useStore as useVuexStore } from 'vuex'
import accountLogin from './login/account-login'
import system from './main/system/system'
import { IRootState, IStoreType } from './types'

export const store = createStore<IRootState>({
  state() {
    return {
      name: 'liu',
      age: 25
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    accountLogin,
    system
  }
})

export function setupStore() {
  store.dispatch('accountLogin/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
