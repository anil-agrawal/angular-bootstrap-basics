import { ChartService } from '../services/chart/chart.service';
import { ComponentHolderService } from '../services/common/component-holder.service';
import { RestURLUtilService } from '../services/common/rest-urlutil.service';
import { RestUtilService } from '../services/common/rest-util.service';
import { BootstrapService } from '../services/common/bootstrap-service';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { FilterService } from '../services/filter/filter-service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CookieService } from 'angular2-cookie/core';

export class AppUtil {

  static toast: ToastsManager;
  static userService: UserService;
  static restURLUtilService: RestURLUtilService;
  static restUtilService: RestUtilService;
  static dashboardService: DashboardService;
  static filterService: FilterService;
  static cookie: CookieService;
  static router: Router;
  static chartService: ChartService;
  static componentHolderService: ComponentHolderService;
  static bootstrapService: BootstrapService;

}
