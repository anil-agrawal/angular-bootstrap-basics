import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { AppUtil } from './app-util';
import { SerializationHelper } from './serialization-helper';
import { AppCache } from './app-cache';
import { OnInit, OnDestroy, Input } from '@angular/core';
import { ChartDataHelper } from './chart-data-helper';

declare var $: any; // JQuery

export class BaseComponent implements OnInit, OnDestroy {

  @Input() uid: string;
  pageHeader: PageHeaderComponent;
  isDestroyed = false;
  recreateComponent: boolean;

  ngOnInit() {
    if (this.recreateComponent === undefined || this.recreateComponent === null || this.recreateComponent === false){
      try {
        const data = AppCache.fetch(this.uid);
        if (data === null || data === undefined) {
          // Do nothing
        } else {
          SerializationHelper.toInstance(this, data);
        }
      } catch (e) { }
    }
    this.isDestroyed = false;
    AppUtil.componentHolderService.push(this.uid, this);
    this.pageHeader = AppUtil.componentHolderService.get('main.page-header');
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    AppCache.push(this.uid, this);
    AppUtil.componentHolderService.push(this.uid, this);
  }
  
  jquery(param:any){
    return $(param);
  }

  formatNumericValue(value: any, unit: any): number {
    return ChartDataHelper.formatNumericValue(value, unit);
  }

  appendValueWithUnit(value: any, unit: any): string {
    return ChartDataHelper.appendValueWithUnit(value, unit);
  }
  
}
