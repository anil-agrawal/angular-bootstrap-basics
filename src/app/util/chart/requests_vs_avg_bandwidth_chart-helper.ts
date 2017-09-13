import { ChartHelper } from './chart-helper';
import { NumberUtil } from '../number-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$VS$AVG$BANDWIDTH$ChartHelper implements ChartHelper {

	dataList: { 
		'number_of_requests': number, 
		'avg_bandwidth': number, 
		'timestamp': number 
	}[];

	units: {
		'number_of_requests': string,
		'avg_bandwidth': string
	};

	metricsMap = {
		'number_of_requests': 'REQUESTS_VS_AVG_BANDWIDTH',
		'avg_bandwidth': 'REQUESTS_VS_AVG_BANDWIDTH'
	}

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const requestSeries = [];
		const bandwidthSeries = [];
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
				bandwidthSeries.push({ 'metrics': this.metricsMap['avg_bandwidth'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.avg_bandwidth, this.units.avg_bandwidth) });
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
				'name': Constants.AVG_BANDWIDTH_TITLE,
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 80,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, self.units.avg_bandwidth); }
				},
			}
			],
			'series': this.fetchLineChartSeries(requestSeries, bandwidthSeries),
			'legend': { 'data': ['No of Requests', Constants.AVG_BANDWIDTH_TITLE] },
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

	private fetchLineChartSeries(requestSeries: any[], bandwidthSeries: any[]): any[] {
		return [
		{
			'name': 'No of Requests',
			'type': 'line',
			'data': requestSeries,
			'yAxisIndex': 0
		},
		{
			'name': Constants.AVG_BANDWIDTH_TITLE,
			'type': 'line',
			'data': bandwidthSeries,
			'yAxisIndex': 1
		}
		];
	}

}
