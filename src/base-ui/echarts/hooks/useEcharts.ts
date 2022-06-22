import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)
export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  return { echartsInstance, setOptions }
}
