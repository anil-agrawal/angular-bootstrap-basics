import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class REQUESTS$ChartHelper implements ChartHelper {

	dataset: {
		responseCode: number,
		responsePayloadSize: number,
		responseTime: number,
		bandwidth: number,
		sourceAddress: string,
		requestOriginTimestamp: string,
		format: string,
		contentType: string
	};

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const data = { xAxis: [], yAxis: [], series: [], legend: {}, color: [], dataZoom: [], tooltip: {}, title: {}, grid: {} };
		data['data'] = {};
		data['data']['mapping'] = chartData['data']['mapping'];
		const list = [];
		let widthMultiplicationFactor = (data['data']['mapping']['order']).length;
		widthMultiplicationFactor += 2;
		widthMultiplicationFactor = 100 / widthMultiplicationFactor;
		for (const rowIndx in chartData['data']['list']) {
			const row = chartData['data']['list'][rowIndx];
			for (const indx in data['data']['mapping']['order']) {
				const key = data['data']['mapping']['order'][indx];
				const value = row[key];
				row[key] = { color: '', icon: '', value: value };
				switch (key) {
					case 'bandwidth': {
						if (value < 500) {
							row[key]['color'] = '#ff0000';
							row[key]['icon'] = 'fa fa-exclamation-triangle';
						} else if (value >= 500 && value < 600) {
							row[key]['color'] = '#fbbe04';
							row[key]['icon'] = 'fa fa-exclamation-triangle';
						} else {
							row[key]['color'] = '';
							row[key]['icon'] = '';
						}
						row[key]['width'] = widthMultiplicationFactor + '%';
						break;
					}
					case 'responseTime': {
						if (value >= 40) {
							row[key]['color'] = '#ff0000';
							row[key]['icon'] = 'fa fa-exclamation-triangle';
						} else if (value < 40 && value >= 30) {
							row[key]['color'] = '#fbbe04';
							row[key]['icon'] = 'fa fa-exclamation-triangle';
						} else {
							row[key]['color'] = '';
							row[key]['icon'] = '';
						}
						row[key]['width'] = widthMultiplicationFactor + '%';
						break;
					}
					case 'requestOriginTimestamp' : {
						row[key]['width'] = (2 * widthMultiplicationFactor) + '%';
						break;
					}
					case 'contentType': {
						row[key]['width'] = (2 * widthMultiplicationFactor) + '%';
						break;
					}
					default: {
						row[key]['width'] = widthMultiplicationFactor + '%';
					}
				}
			}
			list.push(row);
		}
		data['data']['list'] = list;
		data['data']['fakeLinkClass'] = '';
		return data;
	}

}
