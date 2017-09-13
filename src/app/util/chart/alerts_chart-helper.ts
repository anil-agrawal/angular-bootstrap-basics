import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper'; 
import { Constants } from '../constants';

export class ALERTS$ChartHelper implements ChartHelper {

	dataset: {
		originTimestamp: string,
		alertType: string,
		description: string,
		id: string
	};

	fetchDataSet(chartData: any): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const data = { xAxis: [], yAxis: [], series: [], legend: {}, color: [], dataZoom: [], tooltip: {}, title: {}, grid: {} };
		data['data'] = {};
		data['data']['mapping'] = chartData['data']['mapping'];
		data['data']['mapping']['unit'] = {};
		for (const indx in data['data']['mapping']['order']){
			data['data']['mapping']['unit'][data['data']['mapping']['order'][indx]] = '';
		}
		const list = [];
		for (const rowIndx in chartData['data']['list']){
			const row = chartData['data']['list'][rowIndx];
			for (const indx in data['data']['mapping']['order']) {
				const key = data['data']['mapping']['order'][indx];
				const value = row[key];
				row[key] = { color: '', icon: '', value: value };
				switch (key) {
					case 'originTimestamp' : {
						row[key]['width'] = '25%';
						break;
					}
					case 'alertType': {
						row[key]['width'] = '25%';
						break;
					}
					case 'description': {
						row[key]['width'] = '50%';
						row[key]['textAlign'] = 'left';
						break;
					}
					default: {
						
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
