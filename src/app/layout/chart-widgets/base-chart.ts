import { DashletTO } from '../../to/dashboard/dashlet.to';
import { AppUtil } from '../../util/app-util';
import { ArrayMapHelper } from '../../util/array-map-helper';
import { DateTimeUtil } from '../../util/date-time-util';
import { BaseComponent } from '../../util/base-component';
import { ChartHelper } from '../../util/chart/chart-helper';
import { MetricsChartHelperMap } from '../../util/chart/metrics-chart-helper-map';
import { Logger } from '../../util/logger';
import { Constants } from '../../util/constants';
import { StatChartComponent } from './stat-chart.component';
import { MultipleStatChartComponent } from './multiple-stat-chart.component';
import { ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdvanceFilterTO } from '../../to/filter/advance-filter.to';

declare var $: any; // JQuery

export class BaseChart extends BaseComponent implements OnInit, AfterViewInit {

  // ECharts API Reference : https://www.npmjs.com/package/ngx-echarts

  statComponentUID: string;
  multipleStatComponentUID: string;
  counter = 50;
  counterUnit = '';
  echart: any;
  public elRef: ElementRef;
  width: number;
  height: number;
  chart: DashletTO;
  chartHelper: ChartHelper;
  _prevQueryString = '';
  spinnerLeftMargin: number;
  spinnerTopMargin: number;
  showSpinner = false;
  parentChart: BaseChart;
  filter: AdvanceFilterTO;
  intermediateChart: boolean;

  public chartClicked(e: any): void {
    // Logger.trace(e);
  }

  public chartHovered(e: any): void {
    // Logger.trace(e);
  }

  ngOnInit() {
    Logger.trace('UID of BaseChart : ' + this.uid);
    super.ngOnInit(); 
    
    // this.width = this.chart.w * 115;
    if (this.parentChart === undefined || this.parentChart === null) {
      this.width = this.chart.w * (($(window).width() - 22) / 12);
    }else{
      this.width = this.chart.w * (($(window).width() - 82) / 12);
    }
    
    this.height = this.chart.h * Constants.GRIDSTACK_CELL_HEIGHT - 35 - Constants.GRIDSTACK_VERTICAL_MARGIN;
    this.spinnerLeftMargin = (this.width - Constants.SPINNER_SIZE) / 2;
    this.spinnerTopMargin = -((this.height - 50 + Constants.SPINNER_SIZE) / 2);
    
    this.chartHelper = MetricsChartHelperMap.fetchChartHelper(this.chart);
    this.findStatComponentUID();
    this.findMultipleStatComponentUID();
    this.updateChart();
  }

  updateChart(): void {
    this.showSpinner = true;
    AppUtil.chartService.fetchChartData(this);
  }

  onChartInit(echartInstance) {
    this.echart = echartInstance;
    this.updateStatComponent();
    // As of now we are fetching data for MultipleStatComponent independently
    // So its useless to update it from existing dashlets
    // this.updateMultipleStatComponent();
  }

  onChartClick(params: any) {
    const pointInfo = this.findDrilledDataFilter(params);
    Logger.trace('chart clicked with data : '+JSON.stringify(pointInfo));
  }

  onDataFetch(responseObject: any): void {
    this.chartHelper.fetchDataSet(responseObject['data']);
    this.showSpinner = false;
  }

  onDataFetchWithNoChange(): void {
    this.showSpinner = false;
  }

  ngAfterViewInit() {
    if (this.echart !== undefined) {
      this.echart.resize();
    }
  }

  updateStatComponent(): void {
    if (this.statComponentUID !== null && this.statComponentUID !== undefined) {
      const statComponent = <BaseChart>AppUtil.componentHolderService.get(this.statComponentUID);
      if (statComponent !== null && statComponent !== undefined) {
        statComponent.counter = this.counter ;
        statComponent.counterUnit =  this.counterUnit;
      }
    }
  }

  updateMultipleStatComponent(): void {
    if (this.multipleStatComponentUID !== null && this.multipleStatComponentUID !== undefined) {
      const multipleStatComponent = <MultipleStatChartComponent>AppUtil.componentHolderService.get(this.multipleStatComponentUID);
      if (multipleStatComponent !== null && multipleStatComponent !== undefined && multipleStatComponent['isDestroyed'] === false && multipleStatComponent.stats !== null && multipleStatComponent.stats.length > 0) {
        for (let indx in multipleStatComponent.stats) {
          const stat = multipleStatComponent.stats[indx];
          if (stat.metrics === this.chart.metrics) {
            stat.stat = this.counter;
            stat.unit = this.counterUnit;
            multipleStatComponent.changeDetectorRef.detectChanges();
          }
        }
      }
    }
  }

  onResizeBox(x:number, y:number, width:number, height:number, parentElement: any):void{
    // this.width = this.chart.w * (($(window).width()-22)/12);
    this.width = parentElement.width();
    this.height = (parentElement.height()-70);
    this.echart.resize({
      'width':parentElement.width()+'px',
      'height':(parentElement.height()-60)+'px',
      'silent': true
    });
  }

  private findStatComponentUID(): void {
    if (this.chart.type !== 'stat' && this.chart.type !=='multiple_stat') {
      this.statComponentUID = this.uid.substring(0, this.uid.lastIndexOf('_')) + '_stat';
    }
  }

  private findMultipleStatComponentUID(): void {
    if (this.chart.type !== 'stat' && this.chart.type !== 'multiple_stat') {
      this.multipleStatComponentUID = this.uid.substring(0, this.uid.lastIndexOf('.')) + '.statistics_counters_multiple_stats';
    }
  }

  updateCounterUnit(response:any):void{
    try{
      this.counterUnit = response['data']['unit']['counter'];
    }catch(e){}
  }

  private findDimension(key: string, params: any, pointInfo: AdvanceFilterTO) {
    let value: string;
    pointInfo['title'] = params['seriesName'];
    switch(this.chart.type){
      case 'line' : {
        value = params['seriesName'];
        break;
      }
      case 'bar' : {
        value = params['name'];
        break;
      }
      case 'pie' : {
        value = params.data['name'];
        break;
      }
      default : {
        value = params.data['name'];
        break;
      }
    }
    switch (key) {
      case 'source': {
        if (value !== undefined) {
          pointInfo.sources = [value];
        }
        break;
      }
      case 'contentType': {
        if (value !== undefined) {
          pointInfo.contentTypes = [value];
        }
        break;
      }
      case 'destination': {
        if (value !== undefined) {
          pointInfo.destinations = [value];
        }
        break;
      }
      case 'server': {
        if (value !== undefined) {
          pointInfo.servers = [value];
        }
        break;
      }
      case 'format': {
        if (value !== undefined) {
          pointInfo.formats = [value];
        }
        break;
      }
      case 'responseCode': {
        if (value !== undefined) {
          pointInfo.responseCodes = [value];
        }
        break;
      }
    }
  }

  private findDrilledDataFilter(params:any): any{
    let pointInfo: any;
    if (this.chart.useDistributionOnly !== undefined && this.chart.useDistributionOnly === true) {
      if(this.filter!==undefined && this.filter!==null){
        pointInfo = ArrayMapHelper.clone(this.filter);
        pointInfo = ArrayMapHelper.updateAllInMap(new AdvanceFilterTO(), pointInfo);
      }else{
        pointInfo = new AdvanceFilterTO();
      }
      this.findDimension(this.chart.distribution, params, pointInfo);
      pointInfo.additionalDimension = true;

      //We need to remove aggregated filters only for last level requests list api for which parentChart is not null
      if (this.parentChart !== undefined && this.parentChart !==null){
        pointInfo.removeAggregatedFilters = true;
      }

      pointInfo.useFilterTime = true;
      pointInfo.metrics = this.chart.metrics;
      if (params.data['metrics'] !== undefined) {
        pointInfo.metrics = params.data['metrics'];
      }
    } else if (this.chart.useGroupBy !== undefined && this.chart.useGroupBy === true) {
      if (this.filter !== undefined && this.filter !== null) {
        pointInfo = ArrayMapHelper.clone(this.filter);
        pointInfo = ArrayMapHelper.updateAllInMap(new AdvanceFilterTO(), pointInfo);
      } else {
        pointInfo = new AdvanceFilterTO();
      }
      this.findDimension(this.chart.groupBy, params, pointInfo);
      const granularity = AppUtil.chartService.fetchFilters(this)['granularity'];
      const timeRange = DateTimeUtil.findTimeRangeAsPerGranularity(params.data['time'], granularity);
      pointInfo.fromTime = timeRange.fromTime;
      pointInfo.toTime = timeRange.toTime;
      pointInfo.additionalDimension = true;

      //We need to remove aggregated filters only for last level requests list api for which parentChart is not null
      if (this.parentChart !== undefined && this.parentChart !== null) {
        pointInfo.removeAggregatedFilters = true;
      }

      pointInfo.useFilterTime = false;
      pointInfo.metrics = this.chart.metrics;
      if (params.data['metrics'] !== undefined) {
        pointInfo.metrics = params.data['metrics'];
      }
    } else if (params.data['metrics'] === undefined) {
      params.data['metrics'] = this.chart.metrics;
      params.data['title'] = params['seriesName'];
      pointInfo = params.data;
    } else {
      params.data['title'] = params['seriesName'];
      pointInfo = params.data;
    }
    return pointInfo;
  }

}
