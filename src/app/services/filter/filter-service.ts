import { Injectable } from '@angular/core';
import { RestResponse } from '../../to/rest-response';
import { SerializationHelper } from '../../util/serialization-helper';
import { Logger } from '../../util/logger';
import { BootstrapService } from '../common/bootstrap-service';
import { AppUtil } from './../../util/app-util';

@Injectable()
export class FilterService {

  fetchGranularityOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_GRANULARITY_OPTIONS, this.onGranularityOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onGranularityOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onGranularityOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Granularity Options could not be fetched', 'Error');
    }
  }

  fetchTimeDurationOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_Time_Duration_OPTIONS, this.onTimeDurationOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onTimeDurationOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onTimeDurationOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Time Duration Options could not be fetched', 'Error');
    }
  }

  fetchSourceOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_SOURCE_OPTIONS, this.onSourceOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onSourceOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onSourceOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Source Options could not be fetched', 'Error');
    }
  }

  fetchFormatOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_FORMAT_OPTIONS, this.onFormatOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onFormatOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onFormatOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Format Options could not be fetched', 'Error');
    }
  }

  fetchDestinationOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_DESTINATION_OPTIONS, this.onDestinationOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onDestinationOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onDestinationOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Destination Options could not be fetched', 'Error');
    }
  }

  fetchContentTypeOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_CONTENT_TYPE_OPTIONS, this.onContentTypeOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onContentTypeOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onContentTypeOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Content Type Options could not be fetched', 'Error');
    }
  }

  fetchServerOptions(caller: any): boolean {
    try {
    AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_SERVER_OPTIONS, this.onServerOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onServerOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onServerOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Server Options could not be fetched', 'Error');
    }
  }

  fetchMetricsOptions(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.FILTER_METRICS_OPTIONS, this.onMetricsOptionsFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onMetricsOptionsFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService = <BootstrapService>caller;
      bootstrapService.onMetricsOptionsFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Metrics Options could not be fetched', 'Error');
    }
  }

}
