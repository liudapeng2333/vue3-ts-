import { Module } from 'vuex'
import {
  accountLoginRequset,
  requestUserInfoById,
  requestUserMenuById
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToMenus } from '@/utils/map-menus'

import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '@/service/login/type'
import router from '@/router'

const accountLogin: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)

      // 注册路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获得用户按钮权限
      state.permissions = mapMenusToMenus(userMenus)
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登陆逻辑
      const loginResult = await accountLoginRequset(payload)
      const { id, token } = loginResult.data
      localCache.setItem('token', token)

      // 初始化，请求全局的部门和全局的角色
      dispatch('getInitialActionData', null, { root: true })
      commit('changeToken', token)

      // 2.请求用户信息
      const userRequest = await requestUserInfoById(id)
      const userInfo = userRequest.data
      localCache.setItem('userInfo', userInfo)
      commit('changeUserInfo', userInfo)

      //3. 请求用户菜单

      const userMenusRequest = await requestUserMenuById(userInfo.role.id)
      const userMenus = userMenusRequest.data

      localCache.setItem('userMenu', userMenus)
      commit('changeUserMenu', userMenus)

      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getItem('token')
      if (token) {
        commit('changeToken', token)
        // 初始化，请求全局的部门和全局的角色
        dispatch('getInitialActionData', null, { root: true })
      }
      const userInfo = localCache.getItem('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getItem('userMenu')
      if (token) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}

export default accountLogin
