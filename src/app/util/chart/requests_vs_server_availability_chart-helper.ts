import { ChartHelper } from './chart-helper';
import { NumberUtil } from '../number-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$VS$SERVER$AVAILABILITY$ChartHelper implements ChartHelper {

  dataList: {
    server_availability: number,
    number_of_requests: number,
    timestamp: number
  }[];

  units: {
    server_availability: string,
    number_of_requests: string,
  };

  metricsMap = {
    'server_availability': 'REQUESTS_VS_SERVER_AVAILABILITY',
    'number_of_requests': 'REQUESTS_VS_SERVER_AVAILABILITY'
  }

  fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
    const requestSeries = [];
    const availabilitySeries = [];
    const maxSeries = [];
    const labels = [];
    const self = this;
    if (chartData['metrics'] !== undefined) {
      this.metricsMap = chartData['metrics'];
    }
    this.dataList = chartData['list'];
    this.units = chartData['unit'];
    for (const indx in this.dataList) {
      if (this.dataList.hasOwnProperty(indx)) {
        const data = this.dataList[indx];
        requestSeries.push({ 'metrics': this.metricsMap['number_of_requests'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.number_of_requests, 'count') });
        availabilitySeries.push({ 'metrics': this.metricsMap['server_availability'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.server_availability, this.units.server_availability) });
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
        'nameGap':80,
        'type': 'value',
        'axisLabel': {
          'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, 'count'); }
        },
      },
      {
        'name': 'Server Availability',
        'nameRotate': 90,
        'nameLocation': 'middle',
        'nameGap': 80,
        'type': 'value',
        'axisLabel': {
          'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, self.units.server_availability); }
        },
      }
      ],
      'series': this.fetchLineChartSeries(requestSeries, availabilitySeries),
      'legend': { 'data': ['No of Requests', 'Server Availability'] },
      'color': ['#c23531', '#2f4554'],
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

  private fetchLineChartSeries(requestSeries: any[], availabilitySeries: any[]): any[] {
    return [
    {
      'name': 'No of Requests',
      'type': 'line',
      'data': requestSeries,
      'yAxisIndex': 0
    },
    {
      'name': 'Server Availability',
      'type': 'line',
      'data': availabilitySeries,
      'yAxisIndex': 1
    }
    ];
  }

}
