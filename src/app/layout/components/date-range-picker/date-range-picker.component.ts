import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from '../../../util/base-component';
import { Logger } from '../../../util/logger';
import { DateRangePickerDirective } from 'angular2-daterangepicker';
import { BaseFilter } from '../../../interfaces/base-filter';
import { AppUtil } from '../../../util/app-util';

declare var $: any; // JQuery
declare var moment: any; // Moment.js

@Component({
	selector: 'app-date-range-picker',
	templateUrl: './date-range-picker.component.html',
	styleUrls: ['./date-range-picker.component.scss']
})

// Reference : http://www.daterangepicker.com
export class DateRangePickerComponent extends BaseComponent implements OnInit, BaseFilter {
	
	@ViewChild(DateRangePickerDirective) dateRangePickerDirective: DateRangePickerDirective;
	
	dateRangePickerInputId: string;



	startTime : any;
	endTime : any;
	timeLabel = 'Last 1 Hour';
	isLastDuration = true;

	dateRangePickerOptions = {
		'timePicker': true,
		'timePicker24Hour': true,
		'showCustomRangeLabel':true,
		'timePickerIncrement':1,
		'autoUpdateInput':false,
		'ranges': {
			'Last 1 Hour': [
			moment().subtract(1, 'hours').startOf('minute'),
			moment().startOf('minute')
			],
			'Last 2 Hours': [
			moment().subtract(2, 'hours'),
			moment()
			],
			'Last 3 Hours': [
			moment().subtract(3, 'hours'),
			moment()
			],
			'Last 6 Hours': [
			moment().subtract(6, 'hours'),
			moment()
			],
			'Last 12 Hours': [
			moment().subtract(12, 'hours'),
			moment()
			],
			'Last 24 Hours': [
			moment().subtract(24, 'hours'),
			moment()
			],
			'Today': [
			moment().startOf('day'),
			moment().endOf('day')
			],
			'Yesterday': [
			moment().subtract(1, 'days').startOf('day'),
			moment().subtract(1, 'days').endOf('day')
			]
		},
		'locale': {
			'direction': 'ltr',
			'format': 'MM/DD/YYYY HH:mm',
			'separator': ' - ',
			'applyLabel': 'Apply',
			'cancelLabel': 'Cancel',
			'fromLabel': 'From',
			'toLabel': 'To',
			'customRangeLabel': 'Custom',
			'daysOfWeek': [
			'Su',
			'Mo',
			'Tu',
			'We',
			'Th',
			'Fr',
			'Sa'
			],
			'monthNames': [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
			],
			'firstDay': 1
		},
		'startDate': moment().subtract(1, 'hours'),
		'endDate': moment()
	};

	ngOnInit() {
		this.handleDateRangeComponentInstanceVariablesIncaseChildComponentBeingReinitiated();
		let re = /\./gi;
		this.dateRangePickerInputId = this.uid.replace(re, '_') + '-daterangepicker-input';
		this.dateRangePickerDirective['dateCallback'] = this.dateRangeCallback;
	}

	dateRangeCallback(start, end, label) {
		var message = {};
		message['start'] = start;
		message['end'] = end;
		message['label'] = label;
		(this['selected']).emit(message);
	}

	handleDateRangeComponentInstanceVariablesIncaseChildComponentBeingReinitiated(){
		Logger.trace('UID of DateTimeRangeComponent : ' + this.uid);
		const latestDateRangePickerDirective = this.dateRangePickerDirective;
		super.ngOnInit();
		this.dateRangePickerDirective = latestDateRangePickerDirective;
	}

	onChangeDateTime(params:any){
		const start = params['start'];
		const end = params['end'];
		const label = params['label'];
		this.timeLabel = label;
		this.isLastDuration = true;
		if(label === 'Custom'){
			this.timeLabel = start.format('YYYY-MM-DD HH:mm') + ' to ' + end.format('YYYY-MM-DD HH:mm');
			this.isLastDuration = false;
		}
		this.endTime = end.valueOf();
		this.startTime = start.valueOf();
	}

	populateFilter(filterObject: any): void {
		if (this.isLastDuration === true) {
			if (this.timeLabel !== null && this.timeLabel !== undefined && this.timeLabel.length > 0) {
				filterObject['fromDate'] = this.timeLabel;
			}
		} else {
			if (this.startTime !== null && this.startTime !== undefined) {
				filterObject['fromDate'] = this.startTime;
			}
			if (this.endTime !== null && this.endTime !== undefined) {
				filterObject['toDate'] = this.endTime;
			}
		}
	}

	onResetfilter():void{
	}

}
