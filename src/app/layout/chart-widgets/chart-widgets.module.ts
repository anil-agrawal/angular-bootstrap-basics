import { BarChartComponent } from './bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart.component';
import { LineChartComponent } from './line-chart.component';
import { PieChartComponent } from './pie-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart.component';
import { RadarChartComponent } from './radar-chart.component';
import { StatChartComponent } from './stat-chart.component';
import { TabularChartComponent } from './tabular-chart.component';
import { MultipleStatChartComponent } from './multiple-stat-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEchartsModule } from 'ngx-echarts';
import { AngularEchartsDirective } from 'ngx-echarts';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
  CommonModule,
    AngularEchartsModule,
    ComponentsModule
  ],
  declarations: [
    BarChartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    RadarChartComponent,
    StatChartComponent,
    MultipleStatChartComponent,
    TabularChartComponent
  ],
  exports: [
    BarChartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    RadarChartComponent,
    AngularEchartsDirective,
    StatChartComponent,
    MultipleStatChartComponent,
    TabularChartComponent
  ]
})

export class ChartWidgetsModule { }
