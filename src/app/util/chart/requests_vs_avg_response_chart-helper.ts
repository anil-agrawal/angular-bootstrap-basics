import { ChartHelper } from './chart-helper';
import { NumberUtil } from '../number-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$VS$AVG$RESPONSE$ChartHelper implements ChartHelper {

	dataList: {
		'avg': 296.56100835322195,
		'number_of_requests': 49446,
		'timestamp': 1483209000000
	}[];

	units: {
		avg: string,
		number_of_requests: string,
	};

	metricsMap = {
		'avg': 'REQUESTS_VS_AVG_RESPONSE',
		'number_of_requests': 'REQUESTS_VS_AVG_RESPONSE'
	}

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const requestSeries = [];
		const avgResponseTimeSeries = [];
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
				avgResponseTimeSeries.push({ 'metrics': this.metricsMap['avg'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.avg, this.units.avg) });
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
				'name': Constants.AVG_RESPONSE_TIME_TITLE,
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 80,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, self.units.avg); }
				},
			}
			],
			'series': this.fetchLineChartSeries(requestSeries, avgResponseTimeSeries),
			'legend': { 'data': ['No of Requests', Constants.AVG_RESPONSE_TIME_TITLE] },
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

	private fetchLineChartSeries(requestSeries: any[], avgResponseTimeSeries: any[]): any[] {
		return [
		{
			'name': 'No of Requests',
			'type': 'line',
			'data': requestSeries,
			'yAxisIndex': 0
		},
		{
			'name': Constants.AVG_RESPONSE_TIME_TITLE,
			'type': 'line',
			'data': avgResponseTimeSeries,
			'yAxisIndex': 1
		}
		];
	}

}
