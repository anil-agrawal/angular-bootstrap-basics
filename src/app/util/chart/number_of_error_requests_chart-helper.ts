import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class NUMBER$OF$ERROR$REQUESTS$ChartHelper implements ChartHelper {

  dataList: {
    number_of_error_requests: number,
    timestamp: number
  }[];

  fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
    const noOfRequestsSeries = [];
    const labels = [];
    const self = this;
    this.dataList = chartData['list'];
    for (const indx in this.dataList) {
      if (this.dataList.hasOwnProperty(indx)) {
        const data = this.dataList[indx];
        noOfRequestsSeries.push({ 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.number_of_error_requests, 'count') });
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
        'name': 'No of Requests',
        'nameRotate': 90,
        'nameLocation': 'middle',
        'nameGap': 80,
        'type': 'value',
        'axisLabel': {
      'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, 'count'); }
        },
      }
      ],
      'series': this.fetchLineChartSeries(noOfRequestsSeries),
      'legend': { 'data': ['No of Requests'] },
      'color': ['#c23531'],
      'tooltip': {
        'trigger': 'axis',
        'axisPointer': {
          'animation': false
        }
      },
      'title': {},
      'grid': {},
      'dataZoom': []
    };

  }

  private fetchLineChartSeries(noOfRequestsSeries: any[]): any[] {
    return [
    {
      'name': 'No of Requests',
      'type': 'line',
      'data': noOfRequestsSeries
    }
    ];
  }

}
