import { ChartHelper } from './chart-helper';
import { ChartDataHelper } from '../chart-data-helper';
import { BaseChart } from '../../layout/chart-widgets/base-chart'
import { ArrayMapHelper } from '../array-map-helper';
import { AppUtil } from '../app-util';
import { Constants } from '../constants';

export class MULTIPLE$STATS$ChartHelper implements ChartHelper {

	stats : [
	{
		metrics: string,
		title: string,
		stat: number,
		unit: string,
		bgClass: string,
	}
	];

	fetchDataSet(options: any, caller?:BaseChart): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		this.stats = options;
		for (const indx in options) { 
			const data: {
				metrics: string,
				title: string,
				stat: number,
				unit: string,
				bgClass: string,
			} = options[indx];
			const compClone: BaseChart = ArrayMapHelper.cloneComponent(caller);
			compClone.chart.metrics = data.metrics;
			AppUtil.chartService.fetchChartDataFromElse(compClone, this);
		}
		return {
			'xAxis': [], 
			'yAxis': [], 
			'series': this.stats, 
			'legend': {}, 
			'color': [], 
			'dataZoom': [], 
			'tooltip': {}, 
			'title': {}, 
			'grid': {} 
		};
	}

	onDataFetch(responseObject: any, params: any): void {
		for (const indx in this.stats) {
			const data: {
				metrics: string,
				title: string,
				stat: number,
				unit: string,
				bgClass: string,
			} = this.stats[indx];
			if (data.metrics === params['metrics']){
				this.stats[indx]['stat'] = responseObject['data']['counter'];
				this.stats[indx]['unit'] = responseObject['data']['unit']['counter'];
			}
		}
	}

}
