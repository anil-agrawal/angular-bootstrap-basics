import { ChartHelper } from './chart-helper';
import { ArrayMapHelper } from './../../util/array-map-helper';
import { NumberUtil } from '../number-util';
import { DashletTO } from '../../to/dashboard/dashlet.to';
import { AppUtil } from '../../util/app-util';
import { ChartDataHelper } from '../chart-data-helper';
import { Constants } from '../constants';

export class HTTP$RESPONSE$CODES$DistributionChartHelper implements ChartHelper {

	counters: {
		'200': 45344,
		'300': 549,
		'400': 520,
		'500': 515,
		'600': 515
	};

	fetchDataSet(chartData: any, chart?: DashletTO, legend?:string): { xAxis: any[], yAxis: any[], series: any[], legend: any, color: any[], dataZoom: any[], tooltip: any, title: any, grid: any } {
		const data = chartData['data'];
		const self = this;
		const labels = ArrayMapHelper.fetchKeySet(data);
		const unit = this.findUnit(data, labels);
		const values = [];
		for (const indx in labels) {
			if (labels.hasOwnProperty(indx)) {
				const key = labels[indx];
				this.counters = data[key]['counter'];
				let counter = 0;
				if (this.counters['400'] !== undefined){
					counter += this.counters['400'];
				}
				if (this.counters['500'] !== undefined) {
					counter += this.counters['500'];
				}
				if (this.counters['600'] !== undefined) {
					counter += this.counters['600'];
				} 
				values.push({ 'unit': unit, 'value': ChartDataHelper.formatNumericValue(counter, unit) });
			}
		}
		return {
			'yAxis': [
			{
				'name': chart.distribution,
				'nameLocation': 'end',
				'nameGap': 10,
				'type': 'category',
				'data': labels,
				'axisTick': {
					'alignWithLabel': true
				}
			}
			],
			'xAxis': [
			{
				// 'name': legend,
				'nameRotate': 0,
				'nameLocation': 'middle',
				'nameGap': 45,
				'type': 'value',
				'axisLabel': {
					'formatter': function(value, index) { return ChartDataHelper.appendValueWithUnit(value, unit); },
					'rotate': -30
				},
			}
			],
			'series': this.fetchBarChartSeries(values, legend),
			// 'legend': { 'data': [legend] },
			'legend' : {},
			'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'],
			'tooltip': {
				'trigger': 'axis',
				'formatter': this.generateTooltip
			},
			'grid': {
				'left': '3%',
				'right': '4%',
				'bottom': '3%',
				'width': 300,
				'containLabel': true
			},
			'title': {
				'text': chart.title,
				'subtext': '',
				'textAlign': 'left',
				'textStyle': {
					'fontSize': (chart.title.length>40?12:16)
				}
			},
			'dataZoom': []
		};

	}

	private fetchBarChartSeries(values: any[], legend:string): any[] {
		return [
		{
			'name': legend,
			'type': 'bar',
			'stack': 'stack1',
			'label': {
				'normal': {
					'show': false,
					'position': 'inside'
				}
			},
			'data': values
		}
		];
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
