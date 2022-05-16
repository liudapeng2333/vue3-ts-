import { createStore } from 'vuex'
import accountLogin from './login/login'
import { IRootState } from './types'

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
    accountLogin
  }
})

export function setupStore() {
  store.dispatch('accountLogin/loadLocalLogin')
}
