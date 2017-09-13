import { ChartHelper } from './chart-helper';
import { NumberUtil } from '../number-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$VS$BYTES$SERVED$ChartHelper implements ChartHelper {

	dataList: { 
		'number_of_requests': number, 
		'bytes_served': number, 
		'timestamp': number 
	}[];

	units: {
		'number_of_requests': string,
		'bytes_served': string
	};

	metricsMap = {
		'number_of_requests': 'REQUESTS_VS_BYTES_SERVED',
		'bytes_served': 'REQUESTS_VS_BYTES_SERVED'
	}

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const requestSeries = [];
		const bytesServedSeries = [];
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
				requestSeries.push({ 'metrics': this.metricsMap['number_of_requests'], 'unit': 'count', 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.number_of_requests, 'count') });
				bytesServedSeries.push({ 'metrics': this.metricsMap['bytes_served'], 'unit': self.units.bytes_served, 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.bytes_served, this.units.bytes_served) });
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
				'name': 'Bytes Served',
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 80,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, self.units.bytes_served); }
				},
			}
			],
			'series': this.fetchLineChartSeries(requestSeries, bytesServedSeries),
			'legend': { 'data': ['No of Requests', 'Bytes Served'] },
			'color': ['#c23531', '#2f4554'],
			'tooltip': {
				'trigger': 'axis',
				'formatter': this.generateTooltip
			},
			'title': {},
			'grid': {},
			'dataZoom': []
		};
	}

	private fetchLineChartSeries(requestSeries: any[], bytesServedSeries: any[]): any[] {
		return [
		{
			'name': 'No of Requests',
			'type': 'line',
			'data': requestSeries,
			'yAxisIndex': 0
		},
		{
			'name': 'Bytes Served',
			'type': 'line',
			'data': bytesServedSeries,
			'yAxisIndex': 1
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
