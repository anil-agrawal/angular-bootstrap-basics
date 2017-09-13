import { DashboardComponent } from './../../layout/dashboard/dashboard.component';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../to/rest-response';
import { DashboardTO } from './../../to/dashboard/dashboard.to';
import { SerializationHelper } from '../../util/serialization-helper';
import { Logger } from '../../util/logger';
import { AppUtil } from './../../util/app-util';
import { BootstrapService } from '../common/bootstrap-service';

@Injectable()
export class DashboardService {

  constructor() { }

  fetchDashbordList(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.DASHBOARD_LIST, this.onDashbordListFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  fetchDrilledDownDashletList(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.DRILLED_DOWN_DASHLET_LIST, this.onDrilledDownDashletListFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  fetchDrilledDownDashboardList(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.DRILLED_DOWN_DASHBOARD_LIST, this.onDrilledDownDashboardListFetched, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onDashbordListFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const dashboards = response.responseBodyAsJson()['dashboards'];
      AppUtil.toast.success('Dashboard list fetched successfully', 'Success');
    } else {
      AppUtil.toast.error('Dashboard list could not be fetched', 'Error');
    }
  }

  private onDrilledDownDashletListFetched(response: RestResponse, caller: any): void { 
    if (response.status === 200) {
      const bootstrapService: BootstrapService = <BootstrapService>caller;
      bootstrapService.onDrilledDownDashletListFetched(response.responseBodyAsJson());
    } else {
    AppUtil.toast.error('Drilled Down Dashlet list could not be fetched', 'Error');
    }
  }

  private onDrilledDownDashboardListFetched(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      const bootstrapService: BootstrapService = <BootstrapService>caller;
      bootstrapService.onDrilledDownDashboardListFetched(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Drilled Down Dashboard list could not be fetched', 'Error');
    }
  }

}
