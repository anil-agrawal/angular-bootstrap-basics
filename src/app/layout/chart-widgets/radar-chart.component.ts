import { BaseChart } from './base-chart';
import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  animations: [routerTransition()]
})
export class RadarChartComponent extends BaseChart {

  public dataset = [
    [
      10,
      52,
      200,
      334,
      390,
      330,
      220
    ]
  ];
  public chartOption = {
    'color': ['#3398DB'],
    'tooltip': {
      'trigger': 'axis',
      'axisPointer': {
        'type': 'shadow'
      }
    },
    'grid': {
      'left': '3%',
      'right': '4%',
      'bottom': '3%',
      'containLabel': true
    },
    'xAxis': [
      {
        'type': 'category',
        'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        'axisTick': {
          'alignWithLabel': true
        }
      }
    ],
    'yAxis': [
      {
        'type': 'value'
      }
    ],
    'series': [
      {
        'name': 'Demo',
        'type': 'bar',
        'barWidth': '60%'
      }
    ]
  };

  constructor(private _elRef: ElementRef) {
    super();
    this.elRef = _elRef;
  }

}
