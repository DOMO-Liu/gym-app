<script setup lang="ts">
import { echarts, type ECOption } from '@/charts/index'
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/counter'

const chartDom = ref()
const  { getPrimaryColorAlpha } = useThemeStore()


// ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3']
onMounted(() => {
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option);
})

function getVirtualData(year: string | number) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 9)
    ]);
  }
  return data
}

const option: ECOption =  {
  visualMap: {
    show: false,
    min: 0,
    max: 10,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65,
    inRange: {
      color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    }
    // pieces: [
    //   { gte: 150, color: '#216e39' },
    //   { gte: 100, lte: 150, color: '#30a14e' },
    //   { gte: 50, lte: 100, color: '#40c463' },
    //   { gte: 1, lte: 50, color: '#9be9a8' },
    //   { lte: 0, color: '#ebedf0' }
    // ]
  },
  backgroundColor: 'transparent',
  calendar: {
    left: 20,
    right: 20,
    cellSize: 15,
    range: 2023,
    itemStyle: {
      borderWidth: 2,
      borderColor: '#0e2029',
    },
    splitLine: {
      show: false,
    },
    dayLabel: {
      color: '#6E7079',
    },
    monthLabel: {
      color: '#6E7079'
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: getVirtualData(2023),
    itemStyle: {
      color: 'transparent',
      borderColor: 'transparent'
    }
  }
}

//   {
//   tooltip: {},
//   visualMap: {
//     min: 0,
//     max: 8.5,
//     calculable: false,
//     show: false,
//     hoverLink: false,
//     itemHeight: 30,
//     inRange: {
//       color: ['#e3e3e3', 'green'],
//       symbolSize: [30, 30]
//     }
//     // type: 'piecewise',
//     // orient: 'horizontal',
//     // left: 'center',
//     // top: 65
//   },
//   calendar: {
//     left: 30,
//     right: 30,
//     cellSize: ['auto', 13],
//     range: '2016',
//     itemStyle: {
//       borderWidth: 3
//     },
//     yearLabel: { show: false }
//   },
//   series: {
//     type: 'heatmap',
//     coordinateSystem: 'calendar',
//     data: getVirtualData('2016')
//   }
// };

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
