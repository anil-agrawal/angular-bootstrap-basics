import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class RESPONSE$TIME$ChartHelper implements ChartHelper {

  dataList: {
    avg: number,
    min: number,
    max: number,
    timestamp: number
  }[];

  units: {
    avg: string,
    min: string,
    max: string
  };

  fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
    const avgSeries = [];
    const minSeries = [];
    const maxSeries = [];
    const labels = [];
    const self = this;
    this.dataList = chartData['list'];
    this.units = chartData['unit']
    for (const indx in this.dataList) {
      if (this.dataList.hasOwnProperty(indx)) {
        const data = this.dataList[indx];
        avgSeries.push({ 'time': data.timestamp, 'unit': this.units.avg, 'value': ChartDataHelper.formatNumericValue(data.avg, this.units.avg) });
        minSeries.push({ 'time': data.timestamp, 'unit': this.units.min, 'value': ChartDataHelper.formatNumericValue(data.min, this.units.min) });
        maxSeries.push({ 'time': data.timestamp, 'unit': this.units.max, 'value': ChartDataHelper.formatNumericValue(data.max, this.units.max) });
        labels.push(new Date(data.timestamp).toLocaleString());
      }
    }
    return {
      'xAxis': [
      {
        'name': 'Time',
        'nameLocation': 'middle',
        'nameGap': 40,
        'type': 'category',
        'data': labels,
        'axisTick': {
          'alignWithLabel': true
        }
      }
      ],
      'yAxis': [
      {
        'name': Constants.RESPONSE_TIME_TITLE,
        'nameRotate': 90,
        'nameLocation': 'middle',
        'nameGap': 80,
        'type': 'value',
        'axisLabel': {
          'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, self.units.avg); }
        },
      }
      ],
      'series': this.fetchLineChartSeries(maxSeries, avgSeries, minSeries),
    'legend': { 'data': ['Max ' + Constants.RESPONSE_TIME_TITLE, 'Avg ' + Constants.RESPONSE_TIME_TITLE, 'Min ' + Constants.RESPONSE_TIME_TITLE] },
      'color': ['#c23531', '#2f4554', '#61a0a8'],
      'tooltip': {
        'trigger': 'axis',
        'axisPointer': {
          'animation': false
        },
        // 'formatter': this.generateTooltip
      },
      'title': {},
      'grid': {},
      'dataZoom': []
    };
  }

  private fetchLineChartSeries(maxSeries: any[], avgSeries: any[], minSeries: any[]): any[] {
    return [
    {
      'name': 'Max ' + Constants.RESPONSE_TIME_TITLE,
      'type': 'line',
      'data': maxSeries
    },
    {
    'name': 'Avg ' + Constants.RESPONSE_TIME_TITLE,
      'type': 'line',
      'data': avgSeries
    },
    {
    'name': 'Min ' + Constants.RESPONSE_TIME_TITLE,
      'type': 'line',
      'data': minSeries
    }
    ];
  }

  private generateTooltip(params, ticket, callback){
    debugger; 
    return ChartDataHelper.appendValueWithUnit(params[0]['data']['value'], params[0]['data']['unit']);
  }

}
