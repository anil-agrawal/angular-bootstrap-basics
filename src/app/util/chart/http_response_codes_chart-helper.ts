import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class HTTP$RESPONSE$CODES$ChartHelper implements ChartHelper {

	dataList: {
		'response_code_stats': {
			'200': 45344,
			'300': 549,
			'400': 520,
			'500': 515,
			'600': 515
		},
		'timestamp': 1483209000000
	}[];

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const response400Series = [];
		const response500Series = [];
		const response600Series = [];
		const labels = [];
		const self = this;
		this.dataList = chartData['list'];
		for (const indx in this.dataList) {
			if (this.dataList.hasOwnProperty(indx)) {
				const data = this.dataList[indx];
				response400Series.push({ 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['400'], 'count') });
				response500Series.push({ 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['500'], 'count') });
				response600Series.push({ 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data.response_code_stats['600'], 'count') });
				labels.push(new Date(data.timestamp).toLocaleString());
			}
		}
		return {
			'xAxis': [
			{
				'name': 'Time',
				'nameLocation': 'middle',
				'nameGap': 18,
				'type': 'category',
				'data': labels,
				'axisTick': {
					'alignWithLabel': true
				}
			}
			],
			'yAxis': [
			{
				'name': 'HTTP Response Failure Count',
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 30,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, 'count'); }
				},
			}
			],
			'series': this.fetchLineChartSeries(response400Series, response500Series, response600Series),
			'legend': { 'data': ['HTTP Response 400', 'HTTP Response 500'] },
			'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'],
			'tooltip': {
				'trigger': 'axis',
				'axisPointer': {
					'animation': false
				}
			},
			'grid': {
				'left': '3%',
				'right': '4%',
				'bottom': '3%',
				'containLabel': true
			},
			'title': { },
			'dataZoom': []
		};

	}

	private fetchLineChartSeries(response400Series: any[], response500Series: any[], response600Series: any[]): any[] {
		return [
		{
			'name': 'HTTP Response 400',
			'type': 'bar',
			'stack': 'stack1',
			'label': {
				'normal': {
					'show': false,
					'position': 'inside'
				}
			},
			'data': response400Series
		},
		{
			'name': 'HTTP Response 500',
			'type': 'bar',
			'stack': 'stack1',
			'label': {
				'normal': {
					'show': false,
					'position': 'inside'
				}
			},
			'data': response500Series
		},
		{
			'name': 'HTTP Response 600',
			'type': 'bar',
			'stack': 'stack1',
			'label': {
				'normal': {
					'show': false,
					'position': 'inside'
				}
			},
			'data': response600Series
		}
		];
	}

}
