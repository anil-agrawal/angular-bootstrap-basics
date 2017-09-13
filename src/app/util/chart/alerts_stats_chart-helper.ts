import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class ALERTS$STATS$ChartHelper implements ChartHelper {

	dataList: {
		'timestamp': 1483209000000,
		'alert_stats': {
			'CONFORMANCE': 46,
			'HTTP_FAILURE': 1
		}
	}[];

	metrics: {
		alert_stats: string
	};

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const conformanceSeries = [];
		const httpFailureSeries = [];
		const labels = [];
		const self = this;
		this.dataList = chartData['list'];
		this.metrics = chartData['metrics'];
		for (const indx in this.dataList) {
			if (this.dataList.hasOwnProperty(indx)) {
				const data = this.dataList[indx];
				conformanceSeries.push({'distributionAbsent':true, 'metrics': this.metrics.alert_stats, 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.alert_stats['CONFORMANCE'], 'count') });
				httpFailureSeries.push({ 'distributionAbsent': true, 'metrics': this.metrics.alert_stats, 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.alert_stats['HTTP_FAILURE'], 'count') });
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
				'name': 'Alerts',
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 40,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, 'count'); }
				},
			}
			],
			'series': this.fetchLineChartSeries(conformanceSeries, httpFailureSeries),
			'legend': { 'data': ['Conformance', 'HTTP Failure'] },
			'color': ['#c23531', '#2f4554'],
			'tooltip': {
				'trigger': 'axis',
				'axisPointer': {
					'animation': false
				}
			},
			'title': {},
			'grid': {},
			'dataZoom':[]
		};
	}

	private fetchLineChartSeries(conformanceSeries: any[], httpFailureSeries: any[]): any[] {
		return [
			{
				'name': 'Conformance',
				'type': 'line',
				'data': conformanceSeries,
				'yAxisIndex': 0
			},
			{
				'name': 'HTTP Failure',
				'type': 'line',
				'data': httpFailureSeries,
				'yAxisIndex': 0
			}
		];
	}

}
