import { Injectable } from '@angular/core';
import { AppUtil } from '../../util/app-util';
import { FilterOptions } from '../../util/filter-options';
import { SerializationHelper } from '../../util/serialization-helper';
import { Logger } from '../../util/logger';
import { DashboardTO } from './../../to/dashboard/dashboard.to';

@Injectable()
export class BootstrapService {

  init(): void {
    this.populateDrilledDownDashletList();
    this.populateDrilledDownDashboardList();
    this.populateGranularityOptions();
    this.populateTimeDurationOptions();
    this.populateSourceOptions();
    this.populateFormatOptions();
    this.populateDestinationOptions();
    this.populateContentTypeOptions();
    this.populateMetricsTypeOptions();
    this.populateServerOptions();
  }

  populateDrilledDownDashletList(): void {
    AppUtil.dashboardService.fetchDrilledDownDashletList(this);
    Logger.trace('populateDrilledDownDashletList() called');
  }

  onDrilledDownDashletListFetched(response: any): void {
    const dashboard = new DashboardTO();
    SerializationHelper.toInstance(dashboard, response);
    FilterOptions.DRIILED_DOWN_DASHLET_DASHBOARD = dashboard;
    Logger.trace('onDrilledDownDashletListFetched() called');
  }

  populateDrilledDownDashboardList(): void {
    AppUtil.dashboardService.fetchDrilledDownDashboardList(this);
    Logger.trace('populateDrilledDownDashboardList() called');
  }

  onDrilledDownDashboardListFetched(response: any): void {
    FilterOptions.DRIILED_DOWN_DASHBOARDS = response['dashboards'];
    Logger.trace('onDrilledDownDashboardListFetched() called');
  }

  populateGranularityOptions(): void {
    AppUtil.filterService.fetchGranularityOptions(this);
    Logger.trace('populateGranularityOptions() called');
  }

  onGranularityOptionsFetched(response: any): void {
    FilterOptions.GRANULARITY_OPTIONS = response['options'];
    FilterOptions.GRANULARITY_DEFAULT = response['defaultOption'];
    Logger.trace('onGranularityOptionsFetched() called');
  }

  populateTimeDurationOptions(): void {
    AppUtil.filterService.fetchTimeDurationOptions(this);
    Logger.trace('populateTimeDurationOptions() called');
  }

  onTimeDurationOptionsFetched(response: any): void {
    FilterOptions.TIME_DURATION_OPTIONS = response['options'];
    FilterOptions.TIME_DURATION_DEFAULT = response['defaultOption'];
    Logger.trace('onTimeDurationOptionsFetched() called');
  }

  populateSourceOptions(): void {
    AppUtil.filterService.fetchSourceOptions(this);
    Logger.trace('populateSourceOptions() called');
  }

  onSourceOptionsFetched(response: any): void {
    FilterOptions.SOURCE_OPTIONS = response['options'];
    FilterOptions.SOURCE_DEFAULT = response['defaultOption'];
    Logger.trace('onSourceOptionsFetched() called');
  }

  populateFormatOptions(): void {
    AppUtil.filterService.fetchFormatOptions(this);
    Logger.trace('populateFormatOptions() called');
  }

  onFormatOptionsFetched(response: any): void {
    FilterOptions.FORMAT_OPTIONS = response['options'];
    FilterOptions.FORMAT_DEFAULT = response['defaultOption'];
    Logger.trace('onFormatOptionsFetched() called');
  }

  populateDestinationOptions(): void {
    AppUtil.filterService.fetchDestinationOptions(this);
    Logger.trace('populateDestinationOptions() called');
  }

  onDestinationOptionsFetched(response: any): void {
    FilterOptions.DESTINATION_OPTIONS = response['options'];
    FilterOptions.DESTINATION_DEFAULT = response['defaultOption'];
    Logger.trace('onDestinationOptionsFetched() called');
  }

  populateContentTypeOptions(): void {
    AppUtil.filterService.fetchContentTypeOptions(this);
    Logger.trace('populateContentTypeOptions() called');
  }

  onContentTypeOptionsFetched(response: any): void {
    FilterOptions.CONTENT_TYPE_OPTIONS = response['options'];
    FilterOptions.CONTENT_TYPE_DEFAULT = response['defaultOption'];
    Logger.trace('onContentTypeOptionsFetched() called');
  }

  populateMetricsTypeOptions(): void {
    AppUtil.filterService.fetchMetricsOptions(this);
    Logger.trace('populateMetricsTypeOptions() called');
  }

  onMetricsOptionsFetched(response: any): void {
    FilterOptions.METRICS_OPTIONS = response['options'];
    Logger.trace('onMetricsOptionsFetched() called');
  }

  populateServerOptions(): void {
    AppUtil.filterService.fetchServerOptions(this);
    Logger.trace('populateServerOptions() called');
  }

  onServerOptionsFetched(response: any): void {
    FilterOptions.SERVER_OPTIONS = response['options'];
    FilterOptions.SERVER_DEFAULT = response['defaultOption'];
    Logger.trace('onServerOptionsFetched() called');
  }

}
