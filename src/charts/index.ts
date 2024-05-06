import * as echarts from 'echarts/core';
import { LineChart, BarChart, HeatmapChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, CalendarComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { LineSeriesOption, BarSeriesOption, HeatmapSeriesOption } from 'echarts/charts';
import type { ComposeOption, } from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<LineSeriesOption | BarSeriesOption | HeatmapSeriesOption>

// 注册必须的组件
echarts.use([
  GridComponent,
  LineChart,
  BarChart,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  HeatmapChart,
  VisualMapComponent,
]);


export {
  type ECOption,
  echarts
}
