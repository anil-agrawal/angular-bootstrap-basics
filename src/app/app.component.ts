import { ChartService } from './services/chart/chart.service';
import { BootstrapService } from './services/common/bootstrap-service';
import { ComponentHolderService } from './services/common/component-holder.service';
import { RestURLUtilService } from './services/common/rest-urlutil.service';
import { RestUtilService } from './services/common/rest-util.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { FilterService } from './services/filter/filter-service';
import { UserService } from './services/user/user.service';
import { AppUtil } from './util/app-util';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CookieService } from 'angular2-cookie';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ToastsManager]
})
export class AppComponent {

	constructor(
		private translate: TranslateService,
		private _toastr: ToastsManager,
		private _vcr: ViewContainerRef,
		private _userService: UserService,
		private _restURLUtilService: RestURLUtilService,
		private _restUtilService: RestUtilService,
		private _dashboardService: DashboardService,
		private _filterService: FilterService,
		private _cookie: CookieService,
		private _router: Router,
		private _chartService: ChartService,
		private _componentHolderService: ComponentHolderService,
		private _bootstrapService: BootstrapService
		) {
		translate.addLangs(['en', 'fr', 'ur']);
		translate.setDefaultLang('en');
		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|fr|ur/) ? browserLang : 'en');

		// For toastr
		this._toastr.setRootViewContainerRef(_vcr);

		// Store service references in AppUtil class
		AppUtil.userService = this._userService;
		AppUtil.toast = this._toastr;
		AppUtil.restURLUtilService = _restURLUtilService;
		AppUtil.restUtilService = _restUtilService;
		AppUtil.dashboardService = _dashboardService;
		AppUtil.filterService = _filterService;
		AppUtil.cookie = _cookie;
		AppUtil.router = _router;
		AppUtil.chartService = _chartService;
		AppUtil.componentHolderService = _componentHolderService;
		AppUtil.bootstrapService = _bootstrapService;

		_bootstrapService.init();
	}

}