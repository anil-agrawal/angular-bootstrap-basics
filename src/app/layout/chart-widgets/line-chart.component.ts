import { BaseChart } from './base-chart';
import { Component, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AppUtil } from '../../util/app-util';
import { MetricsChartHelperMap } from '../../util/chart/metrics-chart-helper-map';
import { NumberUtil } from '../../util/number-util';
import { Logger } from '../../util/logger';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  animations: [routerTransition()]
})
export class LineChartComponent extends BaseChart {

  public chartOption = {
    'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    'tooltip': {
      'trigger': 'axis'
    },
    'toolbox': {
      'feature': {
        'dataZoom': {
          'yAxisIndex': 'yahoo',
          'title': {
            'zoom' : 'Zoom',
            'back': 'Normal'
          }
        }
      },
      'right': 60
    },
    'xAxis': [
    {
      'name': 'time',
      'type': 'category',
      /*'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],*/
      'data': [],
      'axisTick': {
        'alignWithLabel': true
      }
    }
    ],
    'yAxis': [
    {
      'name': 'count',
      'type': 'value'
    }
    ],
    'legend': { 'data': ['progress'] },
    'series': [
    {
      'name': 'data',
      'type': 'line',
      /*'data': [9, 7, 8, 5, 7, 9, 6]*/
      'data': []
    }
    ],
    /*'dataZoom': [
    {
      'type': 'slider',
      'xAxisIndex': 0,
      'filterMode': 'empty'
    },
    {
      'type': 'slider',
      'yAxisIndex': 0,
      'filterMode': 'empty'
    },
    {
      'type': 'inside',
      'xAxisIndex': 0,
      'filterMode': 'empty'
    },
    {
      'type': 'inside',
      'yAxisIndex': 0,
      'filterMode': 'empty'
    }
    ],*/
  };

  constructor(private _elRef: ElementRef) {
    super();
    this.elRef = _elRef;
  }

  onDataFetch(responseObject: any): void {
    
    if (this.parentChart !== undefined) {
      if (this.intermediateChart === undefined || this.intermediateChart === null || this.intermediateChart === false) {
        this.chart.title = this.parentChart.chart.title + this.chart.title;
      }
    }

    const data = this.chartHelper.fetchDataSet(responseObject['data']);
    if (data !== null && data !== undefined) {

      // Update Default chart  data
      this.chartOption['xAxis'] = data['xAxis'];
      this.chartOption['yAxis'] = data['yAxis'];
      this.chartOption['series'] = data['series'];
      this.chartOption['legend'] = data['legend'];
      this.chartOption['color'] = data['color'];
      this.chartOption['tooltip'] = data['tooltip'];

      // Update existing chart with new data
      this.echart.setOption(this.chartOption);
      this.echart.resize();

    } 
    this.counter = NumberUtil.toInt(responseObject['data']['counter']);
    this.updateCounterUnit(responseObject);
    this.updateStatComponent();
    this.showSpinner = false;
  }

}
