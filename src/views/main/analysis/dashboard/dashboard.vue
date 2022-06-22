<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <ll-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </ll-card>
      </el-col>
      <el-col :span="10">
        <ll-card title="不同城市商品销量">
          <map-echart :mapData="categoryAddressSale"></map-echart>
        </ll-card>
      </el-col>
      <el-col :span="7">
        <ll-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </ll-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <ll-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </ll-card>
      </el-col>
      <el-col :span="12">
        <ll-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </ll-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import LlCard from '@/base-ui/card'

import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    LlCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardActions')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: number[] = []

      store.state.dashboard.categoryGoodsSale.forEach((item: any) => {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      })
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const dataAxis: string[] = []
      const data: number[] = []
      store.state.dashboard.categoryGoodsFavor.forEach((item: any) => {
        dataAxis.push(item.name)
        data.push(item.goodsFavor)
      })
      return { dataAxis, data }
    })
    const categoryAddressSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      categoryAddressSale
    }
  }
})
</script>

<style scoped></style>
