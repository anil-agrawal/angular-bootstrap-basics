import { BaseChart } from './base-chart';
import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NumberUtil } from '../../util/number-util';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  animations: [routerTransition()]
})
export class PieChartComponent extends BaseChart {

  public chartOption = {
    'title': { },
    'tooltip': {
      'trigger': 'item',
      'formatter': '{a} <br/>{b} : {c} ({d}%)'
    },
    'legend': {
      'orient': 'vertical',
      'left': 'left',
      'data': ['legend1', 'legend2', 'legend3', 'legend4', 'legend5']
    },
    'series': [
    {
      'name': 'Sample Series',
      'type': 'pie',
      'radius': '55%',
      'center': ['50%', '60%'],
      'data': [
      { 'value': 335, 'name': 'data1' },
      { 'value': 310, 'name': 'data2' },
      { 'value': 234, 'name': 'data3' },
      { 'value': 135, 'name': 'data4' },
      { 'value': 1548, 'name': 'data5' }
      ],
      'itemStyle': {
        'emphasis': {
          'shadowBlur': 10,
          'shadowOffsetX': 0,
          'shadowColor': 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
    ]
  };

  constructor(private _elRef: ElementRef) {
    super();
    this.elRef = _elRef;
  }

  onDataFetch(responseObject: any): void {
    const data = this.chartHelper.fetchDataSet(responseObject);
    if (data !== null && data !== undefined) {

      // Update Default chart  data
      this.chartOption['series'] = data['series'];
      this.chartOption['legend'] = data['legend'];
      this.chartOption['tooltip'] = data['tooltip'];
      // this.chartOption['title'] = data['title'];
      // this.chartOption['title']['text'] = this.chart.title;
      // this.chartOption['title']['subtext'] = '';
      if ((data['color']).length>0) {
        this.chartOption['color'] = data['color'];
      }
      
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
