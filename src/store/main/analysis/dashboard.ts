import { Module } from 'vuex'
import { IDashboard } from './types'
import { IRootState } from '../../types'

import {
  getAddressGoodsSale,
  getCagegoryGoodsFavor,
  getCategoryGoodsCount,
  getCategoryGoodsSale
} from '@/service/dashboard/dashboard'

const dashboard: Module<IDashboard, IRootState> = {
  namespaced: true,
  state: {
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    addressGoodsSale: []
  },
  mutations: {
    changeCategoryGoodsCount(state, data) {
      state.categoryGoodsCount = data
    },
    changeCategoryGoodsSale(state, data) {
      state.categoryGoodsSale = data
    },
    changeCategoryGoodsFavor(state, data) {
      state.categoryGoodsFavor = data
    },
    changeAddressGoodsSale(state, data) {
      state.addressGoodsSale = data
    }
  },
  actions: {
    async getDashboardActions({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)
      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)
      const categoryGoodsFavorResult = await getCagegoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data)
      const addressGoodsSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSaleResult.data)
    }
  }
}

export default dashboard
