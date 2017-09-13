import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$VS$ALERTS$ChartHelper implements ChartHelper {

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
		'200': 'REQUESTS_VS_ALERTS',
		'300': 'REQUESTS_VS_ALERTS',
		'400': 'REQUESTS_VS_ALERTS',
		'500': 'REQUESTS_VS_ALERTS'
	}

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const requestsSeries = [];
		const response200Series = [];
		const response300Series = [];
		const response400Series = [];
		const response500Series = [];
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
				requestsSeries.push(data.number_of_requests);
				response200Series.push({ 'metrics': this.metricsMap['200'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['200'], 'count') });
				response300Series.push({ 'metrics': this.metricsMap['300'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['300'], 'count') });
				response400Series.push({ 'metrics': this.metricsMap['400'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['400'], 'count') });
				response500Series.push({ 'metrics': this.metricsMap['500'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['500'], 'count') });
				errorResponseSeries.push({ 'metrics': this.metricsMap['500'], 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['400'] + data.response_code_stats['500'], 'count') });
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
				'name': 'Server Availability',
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 80,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, 'count'); }
				},
			}
			],
			'series': this.fetchLineChartSeries(requestsSeries, response200Series, response300Series, response400Series, response500Series, errorResponseSeries),
			'legend': { 'data': ['No of Requests', 'Server Availability'] },
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

	private fetchLineChartSeries(requestsSeries: any[], response200Series: any[], response300Series: any[], response400Series: any[], response500Series: any[], errorResponseSeries: any[]): any[] {
		return [
		{
			'name': 'No of Requests',
			'type': 'line',
			'data': requestsSeries,
			'yAxisIndex': 0
		},
		{
			'name': 'Server Availability',
			'type': 'line',
			'data': errorResponseSeries,
			'yAxisIndex': 1
		}
		];
	}

}
