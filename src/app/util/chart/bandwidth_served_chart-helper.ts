import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class BANDWIDTH$SERVED$ChartHelper implements ChartHelper {

  dataList: {
    avg_bandwidth: number,
    timestamp: number
  }[];

  units: { avg_bandwidth: string };

  fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
    const bandwidthServedSeries = [];
    const labels = [];
    const self = this;
    this.dataList = chartData['list'];
    this.units = chartData['unit'];
    for (const indx in this.dataList) {
      if (this.dataList.hasOwnProperty(indx)) {
        const data = this.dataList[indx];
        bandwidthServedSeries.push({ 'unit': this.units.avg_bandwidth, 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.avg_bandwidth, this.units.avg_bandwidth) });
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
        'name': 'Avg Bandwidth Served',
        'nameRotate': 90,
        'nameLocation': 'middle',
        'nameGap': 80,
        'type': 'value',
        'axisLabel': {
          'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, self.units.avg_bandwidth); }
        },
      }
      ],
      'series': this.fetchLineChartSeries(bandwidthServedSeries),
      'legend': { 'data': ['Avg Bandwidth Served'] },
      'color': ['#c23531'],
      'tooltip': {
        'trigger': 'axis',
        'formatter': this.generateTooltip
      },
      'title' : {},
      'grid': {},
      'dataZoom':[]
    };

  }

  private fetchLineChartSeries(bandwidthServedSeries: any[]): any[] {
    return [
    {
      'name': 'Avg Bandwidth Served',
      'type': 'line',
      'data': bandwidthServedSeries
    }
    ];
  }

  private generateTooltip(params, ticket, callback) {
    let body = '<div>';
    body += '     ' + params[0]['name'] + '<br/>';
    for (const indx in params) {
      const series = params[indx];
      const value = ChartDataHelper.appendValueWithUnit(series['data']['value'], series['data']['unit']);
      body += '    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + series['color'] + ';"></span>'
      body += '  ' + series['seriesName'] + ' : ' + value + '<br/>';
    }
    body += '   </div>';
    return body;
  }

}
