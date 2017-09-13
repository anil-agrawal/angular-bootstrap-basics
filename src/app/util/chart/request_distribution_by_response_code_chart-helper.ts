import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUEST$DISTRIBUTION$By$Response$Code$ChartHelper implements ChartHelper {

	dataList: {
		'200': number,
		'300': number,
		'400': number,
		'500': number,
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
			'color': ['#44b542', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
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
