import * as echarts from 'echarts/core';
import { LineChart, BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { LineSeriesOption, BarSeriesOption } from 'echarts/charts';
import type { ComposeOption, } from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<LineSeriesOption | BarSeriesOption>

// 注册必须的组件
echarts.use([
  GridComponent,
  LineChart,
  BarChart,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
]);


export {
  type ECOption,
  echarts
}
