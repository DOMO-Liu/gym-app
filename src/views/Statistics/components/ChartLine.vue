<script setup lang="ts">
import { echarts, type ECOption } from '@/charts/index'
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/counter'

const chartDom = ref()
const  { getPrimaryColorAlpha } = useThemeStore()


onMounted(() => {
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option);
})

const option: ECOption = {
  xAxis: {
    type: 'category',
    axisLabel: {
      rotate: 25,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    data: [
      '2024-4-1',
      '2024-4-2',
      '2024-4-3',
      '2024-4-4',
      '2024-4-8',
      '2024-4-9',
      '2024-4-10',
    ]
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    }
  },
  legend: {
    data: ['睡眠时长']
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      name: '睡眠时长',
      lineStyle: {
        color: '#516b91',
      },
      itemStyle: {
        color: '#516b91',
      },
    }
  ]
};

</script>

<template>
  <div ref="chartDom" class="chart-main">

  </div>
</template>

<style scoped lang="scss">
.chart-main {
  width: 100%;
  height: 200px;
}
</style>
