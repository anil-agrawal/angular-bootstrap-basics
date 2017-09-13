import { BarChartComponent } from '../layout/chart-widgets/bar-chart.component';
import { DoughnutChartComponent } from '../layout/chart-widgets/doughnut-chart.component';
import { LineChartComponent } from '../layout/chart-widgets/line-chart.component';
import { PieChartComponent } from '../layout/chart-widgets/pie-chart.component';
import { PolarAreaChartComponent } from '../layout/chart-widgets/polar-area-chart.component';
import { RadarChartComponent } from '../layout/chart-widgets/radar-chart.component';
import { StatChartComponent } from '../layout/chart-widgets/stat-chart.component';
import { MultipleStatChartComponent } from '../layout/chart-widgets/multiple-stat-chart.component';
import { TabularChartComponent } from '../layout/chart-widgets/tabular-chart.component';

export class DynamicComponentsMap {
	static map = {
		'bar': BarChartComponent,
		'doughnut': DoughnutChartComponent,
		'line': LineChartComponent,
		'pie': PieChartComponent,
		'polar': PolarAreaChartComponent,
		'radar': RadarChartComponent,
		'stat': StatChartComponent,
		'multiple_stat': MultipleStatChartComponent,
		'tabular': TabularChartComponent,
	};
}
