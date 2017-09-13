import { ChartHelper } from './chart-helper';
import { ArrayMapHelper } from './../../util/array-map-helper';
import { NumberUtil } from '../number-util';
import { DashletTO } from '../../to/dashboard/dashlet.to';
import { AppUtil } from '../../util/app-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class GroupChartHelper implements ChartHelper {

	fetchDataSet(chartData: any, chart?: DashletTO, legend?:string): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const data = chartData;
		const self = this;
		const groups = ArrayMapHelper.fetchKeySet(data);
		const unit = this.findUnit(data, groups);
		const dataKey = this.findDataKey(data, groups);
		const seriesList = [];
		let xAxisLabels: string[];
		for (const indx in groups) {
			const series = [];
			const labels = [];
			if (groups.hasOwnProperty(indx)) {
				const key = groups[indx];
				const dataList = data[key]['list'];

				for (const i in dataList) {
					if (dataList.hasOwnProperty(i)) {
						const data = dataList[i];
						series.push({ 'unit': unit, 'time': data.timestamp, 'value': ChartDataHelper.formatNumericValue(data[dataKey], unit) });
						labels.push(new Date(data.timestamp).toLocaleString());
					}
				}
				xAxisLabels = labels;
				seriesList.push({ 'series': series, 'labels': labels, 'seriesName': key });
				// values.push(ChartDataHelper.formatNumericValue(data[key]['counter'], unit));
			}
		}
		return {
			'xAxis': [
			{
				'name': 'Time',
				'nameLocation': 'middle',
				'nameGap': 40,
				'type': 'category',
				'data': xAxisLabels,
				'axisTick': {
					'alignWithLabel': true
				}
			}
			],
			'yAxis': [
			{
				'name': Constants.RESPONSE_TIME_TITLE,
				'nameRotate': 90,
				'nameLocation': 'middle',
				'nameGap': 80,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, unit); }
				},
			}
			],
			'series': this.fetchLineChartSeries(seriesList),
			'legend': { 'data': groups },
			'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
			'tooltip': {
				'trigger': 'axis',
				'formatter': this.generateTooltip
			},
			'title': {},
			'grid': {},
			'dataZoom': []
		};

	}

	private fetchLineChartSeries(seriesList: { series: any[], labels: any[], seriesName: string }[]): any[] {
		let result = [];
		for (const indx in seriesList){
			const data = seriesList[indx];
			result.push({
				'name': data.seriesName,
				'type': 'line',
				'data': data.series
			});
		}
		return result;
	}

	private findUnit(data:any, labels: string[]): string{
		let unit: string;
		if (labels.length > 0) {
			const units = data[labels[0]]['unit'];
			if (units === undefined || units===null) {
				unit = 'count';
			}else if (typeof units !== 'string') {
				const unitKeys = ArrayMapHelper.fetchKeySet(units);
				if (unitKeys.length > 0) {
					unit = units[unitKeys[0]]
				}
			} else {
				unit = units;
			}
		}
		return unit;
	}

	private findDataKey(data: any, labels: string[]): string {
		let dataKey: string;
		if (labels.length > 0) {
			const dataList = data[labels[0]]['list'];
			if (dataList !== undefined && dataList !== null && dataList.length>0) {
				const dataKeys = ArrayMapHelper.fetchKeySet(dataList[0]);
				for (const indx in dataKeys) { 
					if (dataKeys[indx]!=='timestamp'){
						dataKey = dataKeys[indx];
						break;
					}
				}
			} 
		}
		return dataKey;
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
