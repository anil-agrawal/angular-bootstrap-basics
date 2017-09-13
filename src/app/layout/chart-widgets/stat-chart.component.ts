import { BaseChart } from './base-chart';
import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  animations: [routerTransition()]
})
export class StatChartComponent extends BaseChart {

  constructor(private _elRef: ElementRef) {
    super();
    this.elRef = _elRef;
  }

}
