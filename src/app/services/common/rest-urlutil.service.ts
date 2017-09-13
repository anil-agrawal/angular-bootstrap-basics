import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class RestURLUtilService {

  USER_LOGIN = environment.apiBaseUrl + '/api/v1/sec/login';
  USER_LOGOUT = environment.apiBaseUrl + '/api/v1/sec/logout';
  USER_SIGNUP = environment.apiBaseUrl + '/api/v1/user';
  DASHBOARD_LIST = environment.apiBaseUrl + '/api/v1/dashboard/dashboards';
  DRILLED_DOWN_DASHLET_LIST = environment.apiBaseUrl + '/api/v1/dashboard/drilledDashlets';
  DRILLED_DOWN_DASHBOARD_LIST = environment.apiBaseUrl + '/api/v1/dashboard/drilledDashboards';
  CHART_DATA = environment.apiBaseUrl + '/api/v1/data';
  FILTER_GRANULARITY_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/granularity';
  FILTER_METRICS_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/metrics';
  FILTER_Time_Duration_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/durations';
  FILTER_SOURCE_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/sources';
  FILTER_FORMAT_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/formats';
  FILTER_DESTINATION_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/destinations';
  FILTER_CONTENT_TYPE_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/contenttypes';
  FILTER_SERVER_OPTIONS = environment.apiBaseUrl + '/api/v1/filter/servers';

  constructor() { }

}
