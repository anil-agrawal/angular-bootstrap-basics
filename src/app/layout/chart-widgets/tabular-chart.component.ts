import { BaseChart } from './base-chart';
import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NumberUtil } from '../../util/number-util';
import { ArrayMapHelper } from '../../util/array-map-helper';
import { AppUtil } from '../../util/app-util';
import { Logger } from '../../util/logger';
import { AdvanceFilterTO } from './../../to/filter/advance-filter.to';

@Component({
  selector: 'app-tabular-chart',
  templateUrl: './tabular-chart.component.html',
  animations: [routerTransition()],
})
export class TabularChartComponent extends BaseChart {

  list = [];
  headers = [];
  keys = [];
  units = {};
  fakeLinkClass: string;
  constructor(private _elRef: ElementRef) {
    super();
    this.elRef = _elRef;
  }

  onDataFetch(responseObject: any): void {
    const data = this.chartHelper.fetchDataSet(responseObject)['data'];
    if (this.filter === undefined || this.filter.fetchNext === undefined || this.filter.fetchNext ===false){
      this.fakeLinkClass = data['fakeLinkClass'];
      const titles = data['mapping']['title'];
      this.units = data['mapping']['unit'];
      this.keys = data['mapping']['order'];
      this.list = data['list'];

      this.headers = [];
      for (const indx in this.keys) {
        this.headers.push(titles[this.keys[indx]]);
      }
    }else{
      if ((data['list']).length>0){
        this.list = ArrayMapHelper.addAllInList(this.list, data['list']);
      }else{
        AppUtil.toast.info('There are no more records to fetch', 'Info');
      }
    }
    this.showSpinner = false;
  }

  fetchKeySet(object:any):any[]{
    return Object.keys(object);
  }

  onChartClick(rowKey: any, colKey?: string) {
    if (this.fakeLinkClass === undefined || this.fakeLinkClass === null || this.fakeLinkClass === '') { 
      return;
    }
    if (colKey===this.chart.distribution) {
      return;
    }
    const filter = new AdvanceFilterTO();
    filter.metrics = colKey;
    filter.useFilterTime = true;

    filter.additionalDimension = true;
    this.findAdditionalDimension(filter, this.chart.distribution, rowKey);
    
  }

  findAdditionalDimension(filter: AdvanceFilterTO, distribution:string, value:string):void {
    if (distribution === 'server') {
      filter.servers = [value];
    } else if (distribution === 'source') {
      filter.sources = [value];
    } else if (distribution === 'contentType') {
      filter.contentTypes = [value];
    } else if (distribution === 'destination') {
      filter.destinations = [value];
    } else if (distribution === 'format') {
      filter.formats = [value];
    }
  }

  fetchMoreData(params:any): void{
    if(this.filter===undefined){
      this.filter = new AdvanceFilterTO();
    }
    this.filter.fetchNext = true;
    AppUtil.chartService.fetchChartData(this);
  }

}
