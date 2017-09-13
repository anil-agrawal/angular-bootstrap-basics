import { BaseChart } from './base-chart';
import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { StatTO } from '../../to/dashboard/stat.to';
import { Logger } from '../../util/logger';
import { MULTIPLE$STATS$ChartHelper } from '../../util/chart/multiple_stats_chart-helper';
import { AdvanceFilterTO } from './../../to/filter/advance-filter.to';
import { AppUtil } from '../../util/app-util';
import { NumberUtil } from '../../util/number-util';
import { ArrayMapHelper } from '../../util/array-map-helper';

@Component({
	selector: 'app-multiple-stat-chart',
	templateUrl: './multiple-stat-chart.component.html',
	animations: [routerTransition()]
})
export class MultipleStatChartComponent extends BaseChart implements OnInit {

	fakeLinkClass = 'fake-link';
	// stats:StatTO[];
	stats = [
	{
		'metrics': 'RESPONSE_TIME',
		'title':'Avg Response Time',
		'stat': 12312312,
		'unit': 'ms',
		'bgClass': 'card-primary'
	},
	{
		'metrics': 'BYTES_SERVED',
		'title':'Total Bytes Served',
		'stat': 12312312,
		'unit': 'MB',
		'bgClass': 'card-info'
	},
	{
		'metrics': 'BANDWIDTH_SERVED',
		'title':'Avg Bandwidth Served',
		'stat': 12312312,
		'unit': 'MB',
		'bgClass': 'card-success'
	},
	{
		'metrics': 'RESPONSES_VS_REQUESTS',
		'title':'Server Availability',
		'stat': 10,
		'unit': '%',
		'bgClass': 'card-danger'
	}
	];

	changeDetectorRef: ChangeDetectorRef

	constructor(private _elRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
		super();
		this.elRef = _elRef;
		this.changeDetectorRef = _changeDetectorRef;
	}

	ngOnInit(){
		Logger.trace('UID of MultipleStatChartComponent : ' + this.uid);
		super.ngOnInit();
		this.stats = this.chart.other;
	}

	onDataFetch(responseObject: any): void {
		// No use of above data, as of now, no special METRICS or API defined for this component type
		this.stats = (<MULTIPLE$STATS$ChartHelper>this.chartHelper).fetchDataSet(this.chart.other, this).series;
		this.showSpinner = false;
	}

	onChartClick(metrics: any, title?: string) {
		if (this.fakeLinkClass === undefined || this.fakeLinkClass === null || this.fakeLinkClass === '') {
			return;
		}
		const filter = new AdvanceFilterTO();
		filter.metrics = metrics;
		filter.useFilterTime = true;
	}

}
