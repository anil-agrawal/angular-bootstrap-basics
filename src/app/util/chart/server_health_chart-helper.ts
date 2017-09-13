import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class SERVER$HEALTH$ChartHelper implements ChartHelper {

	dataset : {
		bytes_served: number,
		bandwidth_served: number,
		response_time: number,
		server_availability: number,
		source: string,
		server: string
	};

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const data = { xAxis: [], yAxis: [], series: [], legend: {}, color: [], dataZoom: [], tooltip: {}, title: {}, grid: {} };
		data['data'] = {};
		data['data']['mapping'] = chartData['data']['mapping'];
		const list = [];
		for (const rowIndx in chartData['data']['list']) {
			const row = chartData['data']['list'][rowIndx];
			for (const indx in data['data']['mapping']['order']) {
				const key = data['data']['mapping']['order'][indx];
				const value = row[key];
				switch (key) {
					case 'bytes_served': {
						row[key] = { color: '', icon: '' };
						break;
					}
					case 'bandwidth_served': {
						if (value < 500) {
							row[key] = { color: '#ff0000', icon: 'fa fa-exclamation-triangle' };
						} else if (value >= 500 && value < 600) {
							row[key] = { color: '#fbbe04', icon: 'fa fa-exclamation-triangle' };
						} else {
							row[key] = { color: '', icon: '' };
						}
						break;
					}
					case 'response_time': {
						if (value >= 40) {
							row[key] = { color: '#ff0000', icon: 'fa fa-exclamation-triangle' };
						} else if (value < 40 && value >= 30) {
							row[key] = { color: '#fbbe04', icon: 'fa fa-exclamation-triangle' };
						} else {
							row[key] = { color: '', icon: '' };
						}
						break;
					}
					case 'server_availability': {
						if (value < 99) {
							row[key] = { color: '#ff0000', icon: 'fa fa-exclamation-triangle' };
						} else if (value >= 99 && value < 99.99) {
							row[key] = { color: '#fbbe04', icon: 'fa fa-exclamation-triangle' };
						} else {
							row[key] = { color: '', icon: '' };
						}
						break;
					}
					default: {
						row[key] = { color: '', icon: '' };
					}
				}
				row[key]['value'] = value;
				row[key]['width'] = (100/(data['data']['mapping']['order']).length)+'%';
			}
			list.push(row);
		}
		data['data']['list'] = list;
		data['data']['fakeLinkClass'] = 'fake-link';
		return data;
	}

}
