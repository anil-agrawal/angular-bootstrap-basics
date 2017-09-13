import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUEST$DISTRIBUTION$ChartHelper implements ChartHelper {

	dataList: {
		'192.168.4.12': 5532573,
		'192.168.4.13': 3105093,
		'192.168.4.11': 2943250,
		'192.168.4.14': 2435021,
		'192.168.4.15': 3720904
	};

	metrics = 'REQUEST_DISTRIBUTION';

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const requestsSeries = [];
		const labels = [];
		const self = this;
		this.dataList = chartData['data'];
		this.metrics = chartData['metrics'];
		
		for (const key in this.dataList) {
			if (this.dataList.hasOwnProperty(key)) {
				const data = this.dataList[key];
				requestsSeries.push({ 'metrics': this.metrics, 'name': key, 'value': ChartDataHelper.formatNumericValue(this.dataList[key], 'count') });
				labels.push(key);
			}
		}
		return {
			'xAxis': [],
			'yAxis': [],
			'color': [],
			'dataZoom': [],
			'grid': {},
			'series': [
			{
				'name': 'Request Distribution',
				'type': 'pie',
				'radius': '55%',
				'center': ['50%', '60%'],
				'data': requestsSeries,
				'itemStyle': {
					'emphasis': {
						'shadowBlur': 10,
						'shadowOffsetX': 0,
						'shadowColor': 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
			],
			'legend': {
				'orient': 'vertical',
				'left': 'left',
				'data': labels
			},
			'tooltip': {
				'trigger': 'item',
				'formatter': '{a} <br/>{b} : {c} ({d}%)'
			},
			'title': {  }
		};

	}

}
