import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$VS$HTTP$RESPONSE$FAILURES$ChartHelper implements ChartHelper {

  dataList: {
    'number_of_requests': 208,
    'response_code_stats': {
      '200': 53,
      '300': 45,
      '400': 53,
      '500': 57
    },
    timestamp: number
  }[];

  metricsMap = {
    'number_of_requests': 'REQUESTS_VS_HTTP_RESPONSE_FAILURES',
    'response_code_stats': 'REQUESTS_VS_HTTP_RESPONSE_FAILURES'
  }

  fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
    const requestsSeries = [];
    const errorResponseSeries = [];
    const labels = [];
    const self = this;
    if (chartData['metrics'] !== undefined) {
      this.metricsMap = chartData['metrics'];
    }
    this.dataList = chartData['list'];
    for (const indx in this.dataList) {
      if (this.dataList.hasOwnProperty(indx)) {
        const data = this.dataList[indx];
        requestsSeries.push({ 'metrics': this.metricsMap['number_of_requests'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.number_of_requests, 'count') });
        let errors = 0;
        if (data.response_code_stats['400']!==undefined) { 
          errors += data.response_code_stats['400']
        }
        if (data.response_code_stats['500'] !== undefined) {
          errors += data.response_code_stats['500']
        }
        if (data.response_code_stats['600'] !== undefined) {
          errors += data.response_code_stats['600']
        }
        errorResponseSeries.push({ 'metrics': this.metricsMap['response_code_stats'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(errors, 'count') });
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
      },
      {
        'name': 'HTTP Response Failures',
        'nameRotate': 90,
        'nameLocation': 'middle',
        'nameGap': 80,
        'type': 'value',
        'axisLabel': {
          'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, 'count'); }
        },
      }
      ],
      'series': this.fetchLineChartSeries(requestsSeries, errorResponseSeries),
      'legend': { 'data': ['No of Requests', 'HTTP Response Failures'] },
      'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'],
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

  private fetchLineChartSeries(requestsSeries: any[], errorResponseSeries: any[]): any[] {
    return [
    {
      'name': 'No of Requests',
      'type': 'line',
      'data': requestsSeries,
      'yAxisIndex': 0
    },
    {
      'name': 'HTTP Response Failures',
      'type': 'line',
      'data': errorResponseSeries,
      'yAxisIndex': 1
    }
    ];
  }

}
