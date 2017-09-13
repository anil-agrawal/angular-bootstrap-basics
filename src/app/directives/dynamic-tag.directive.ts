import { BaseChart } from '../layout/chart-widgets/base-chart';
import { PieChartComponent } from '../layout/chart-widgets/pie-chart.component';
import { StatComponent } from '../shared/modules/stat/stat.component';
import { DashletTO } from '../to/dashboard/dashlet.to';
import { AdvanceFilterTO } from '../to/filter/advance-filter.to';
import { DynamicComponentsMap } from './dynamic-components.map';
import { Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDynamicTag]'
})

export class DynamicTagDirective implements OnInit {

  @Input() chartType: string;
  @Input() uid: string;
  @Input() dashlet: DashletTO;
  @Input() parentChart: BaseChart;
  @Input() filter: AdvanceFilterTO;
  @Input() recreateComponent: boolean;
  @Input() intermediateChart: boolean;

  constructor(
    private cfResolver: ComponentFactoryResolver,
    public vcRef: ViewContainerRef,
    private renderer: Renderer2
    ) { }

  ngOnInit() {
    this.appendComponent();
  }

  public appendComponent() {
    const factory =
    this.cfResolver.resolveComponentFactory(DynamicComponentsMap.map[this.chartType]);
    const componentRef = this.vcRef.createComponent(factory);

    // Set Component properties
    const component = <BaseChart>componentRef.instance;
    component.uid = this.uid;
    component.chart = this.dashlet;
    if (this.parentChart !== null && this.parentChart!==undefined) { 
      component.parentChart = this.parentChart;
    }
    if(this.filter!=null && this.filter!==undefined){
      component.filter = this.filter;
    }
    if (this.recreateComponent!==undefined && this.recreateComponent === true) {
      component.recreateComponent = this.recreateComponent;
    }
    if (this.intermediateChart !== undefined && this.intermediateChart === true) {
      component.intermediateChart = this.intermediateChart;
    }

    this.renderer.appendChild(
      this.vcRef.element.nativeElement,
      componentRef.injector.get(DynamicComponentsMap.map[this.chartType]).elRef.nativeElement
      );
  }

}
