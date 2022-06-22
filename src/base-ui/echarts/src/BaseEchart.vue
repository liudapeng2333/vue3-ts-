<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, withDefaults, watchEffect } from 'vue'
import * as echarts from 'echarts'
import useEcharts from '../hooks/useEcharts'

const props = withDefaults(
  defineProps<{
    options: echarts.EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '200px'
  }
)

const echartRef = ref<HTMLElement>()

onMounted(() => {
  if (echartRef.value) {
    const { setOptions } = useEcharts(echartRef.value)
    watchEffect(() => {
      setOptions(props.options)
    })
  }
})
</script>

<style lang="scss" scoped></style>
