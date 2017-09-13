import { BarChartComponent } from '../layout/chart-widgets/bar-chart.component';
import { DoughnutChartComponent } from '../layout/chart-widgets/doughnut-chart.component';
import { LineChartComponent } from '../layout/chart-widgets/line-chart.component';
import { PieChartComponent } from '../layout/chart-widgets/pie-chart.component';
import { PolarAreaChartComponent } from '../layout/chart-widgets/polar-area-chart.component';
import { RadarChartComponent } from '../layout/chart-widgets/radar-chart.component';
import { StatChartComponent } from '../layout/chart-widgets/stat-chart.component';
import { MultipleStatChartComponent } from '../layout/chart-widgets/multiple-stat-chart.component';
import { TabularChartComponent } from '../layout/chart-widgets/tabular-chart.component';
import { DynamicTagDirective } from './dynamic-tag.directive';
import { VarDirective } from './ng-var.directive';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  declarations: [
    DynamicTagDirective,
    VarDirective
  ],
  exports: [
    DynamicTagDirective,
    VarDirective
  ],
  entryComponents: [
    PieChartComponent,
    RadarChartComponent,
    PolarAreaChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    StatChartComponent,
    MultipleStatChartComponent,
    TabularChartComponent
  ]
})

export class DirectivesModule {
}
