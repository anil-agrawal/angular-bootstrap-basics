import { BaseFilter } from '../../../interfaces/base-filter';
import { BaseComponent } from '../../../util/base-component';
import { DateTimeUtil } from '../../../util/date-time-util';
import { FilterOptions } from '../../../util/filter-options';
import { Logger } from '../../../util/logger'; 
import { AppUtil } from '../../../util/app-util';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var $: any; // JQuery

//Depricated : Dont use this component. Use date-range-component instead
@Component({
  selector: 'app-date-time-range',
  templateUrl: './date-time-range.component.html',
  styleUrls: ['./date-time-range.component.scss']
})
export class DateTimeRangeComponent extends BaseComponent implements OnInit, BaseFilter {

  isLastDuration = true;
  duration : string;
  startTime: string;
  endTime: string;
  dateRange = this.duration;
  closeResult: string;
  modelOptions: NgbModalOptions;
  modelRef: NgbModalRef;
  durationOptions: string[];

  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    Logger.trace('UID of DateTimeRangeComponent : ' + this.uid);
    this.modelOptions = { 'windowClass': 'header-filter-date-time-modal', 'size': 'sm' };
    super.ngOnInit();
    if (this.durationOptions === null || this.durationOptions === undefined || this.durationOptions.length < 1) {
      this.durationOptions = FilterOptions.TIME_DURATION_OPTIONS;
      this.duration = FilterOptions.TIME_DURATION_DEFAULT;
    }
  }

  public setStartTime(moment: any): any {
    this.startTime = moment;
    this.updateDateRange();
  }

  public setEndTime(moment: any): any {
    this.endTime = moment;
    this.updateDateRange();
  }

  openDateTimeRangeModel(content): void {
    this.modelRef = this.modalService.open(content, this.modelOptions);
    this.modelRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onChangeSelectionOption(lastDurationClicked: boolean) {
    this.isLastDuration = lastDurationClicked;
    this.updateDateRange();
  }

  isSelectionOptionChecked(islastDurationOption: boolean): string {
    let result = '';
    if (islastDurationOption) {
      if (this.isLastDuration) {
        result = 'checked';
      }
    } else {
      if (!this.isLastDuration) {
        result = 'checked';
      }
    }
    return result;
  }

  onResetFilter(): void {
    this.isLastDuration = true;
    this.duration = '';
    this.startTime = '';
    this.endTime = '';
    this.closeResult = '';
  }

  onSelectionDone(): void {
    this.modelRef.dismiss();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private updateDateRange(): void {
    if (this.isLastDuration === true) {
      this.dateRange = this.duration;
    } else {
      if (this.startTime !== null && this.startTime !== undefined) {
        const startTime = new Date(this.startTime);
        this.dateRange = DateTimeUtil.fetchShortDateTime(startTime);
      }
      if (this.endTime !== null && this.endTime !== undefined) {
        const endTime = new Date(this.endTime);
        this.dateRange += ' to ' + DateTimeUtil.fetchShortDateTime(endTime);
      }
    }
    
  }

  populateFilter(filterObject: any): void {
    if (this.isLastDuration === true) {
      if (this.duration !== null && this.duration !== undefined && this.duration.length > 0) {
        filterObject['fromDate'] = this.duration;
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

}
