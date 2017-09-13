import { ChartHelper } from './chart-helper';
import { NumberUtil } from '../number-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class RESPONSES$VS$REQUESTS$ChartHelper implements ChartHelper {

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
		'number_of_requests': 'RESPONSES_VS_REQUESTS',
		'server_availability': 'RESPONSES_VS_REQUESTS'
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
			'series': this.fetchLineChartSeries(availabilitySeries),
			'legend': { 'data': ['Server Availability'] },
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

	private fetchLineChartSeries(availabilitySeries: any[]): any[] {
		return [
		{
			'name': 'Server Availability',
			'type': 'line',
			'data': availabilitySeries,
			'yAxisIndex': 0
		}
		];
	}

}

