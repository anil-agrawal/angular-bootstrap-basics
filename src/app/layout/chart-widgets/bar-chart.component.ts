import { BaseChart } from './base-chart';
import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NumberUtil } from '../../util/number-util';
import { DashletTO } from '../../to/dashboard/dashlet.to';
import { ArrayMapHelper } from '../../util/array-map-helper';
import { DistributionChartHelper } from '../../util/chart/distribution-chart-helper';

declare var $: any; // JQuery

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  animations: [routerTransition()],
})
export class BarChartComponent extends BaseChart {

  dataZoom = [
  {
    'type': 'slider',
    'xAxisIndex': 0,
    'filterMode': 'empty'
  },
    /*{
      'type': 'slider',
      'yAxisIndex': 0,
      'filterMode': 'empty'
    },*/
    {
      'type': 'inside',
      'xAxisIndex': 0,
      'filterMode': 'empty'
    },
    /*{
      'type': 'inside',
      'yAxisIndex': 0,
      'filterMode': 'empty'
    }*/
    ];

    public chartOption = {
      'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      'tooltip': {
        'trigger': 'axis',
        'axisPointer': {
          'type': 'shadow'
        }
      },
      'toolbox': {
        'feature': {
          'dataZoom': {
            'yAxisIndex': 'yahoo',
            'title': {
              'zoom': 'Zoom',
              'back': 'Normal'
            }
          }
        },
        'right': 30
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
        'data': [],
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
        'name': 'Demo1',
        'type': 'bar', 
        'stack': 'stack1',
        'label': {
          'normal': {
            'show': true,
            'position': 'inside'
          }
        },
        'data': []
      }
      ]
    };

    constructor(private _elRef: ElementRef) {
      super();
      this.elRef = _elRef;
    }

    onDataFetch(responseObject: any): void {
      let data: any;
      if (this.chart.useDistributionOnly !== undefined && this.chart.useDistributionOnly==true) {
        if(this.parentChart!==undefined){
          if (this.intermediateChart === undefined || this.intermediateChart === null || this.intermediateChart === false){
            this.chart.title = this.parentChart.chart.title + this.chart.title;
          }
        }
        data = (<DistributionChartHelper>this.chartHelper).fetchDataSet(responseObject, this.chart, this.parentChart.chart.title);
      }else{
        data = this.chartHelper.fetchDataSet(responseObject['data']);
      }

      if (data !== null && data !== undefined) {

        // Update Default chart  data
        this.chartOption['xAxis'] = data['xAxis'];
        this.chartOption['yAxis'] = data['yAxis'];
        this.chartOption['color'] = data['color'];
        this.chartOption['series'] = data['series'];
        this.chartOption['legend'] = data['legend'];
        this.chartOption['tooltip'] = data['tooltip'];
        this.chartOption['grid'] = data['grid'];
        // this.chartOption['title'] = data['title'];
        // this.chartOption['title']['text'] = this.chart.title;
        // this.chartOption['title']['subtext'] = '';

        // We don't need zooming feature for distribution charts
        // Disabling zooing feature for all, as we are using Zooming through toolbox
        
        if (this.chart.useDistributionOnly !== undefined && this.chart.useDistributionOnly == true) {
          this.chartOption['toolbox']['right'] = 60;
          // this.chartOption['dataZoom'] = [];
        }else{
          // this.chartOption['dataZoom'] = this.dataZoom;
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
