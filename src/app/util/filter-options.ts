import { DashboardTO } from './../to/dashboard/dashboard.to';

export class FilterOptions {

  static GRANULARITY_OPTIONS: string[];
  static GRANULARITY_DEFAULT: string;

  static TIME_DURATION_OPTIONS: string[];
  static TIME_DURATION_DEFAULT: string;

  static SOURCE_OPTIONS: string[];
  static SOURCE_DEFAULT: string;

  static FORMAT_OPTIONS: string[];
  static FORMAT_DEFAULT: string;

  static DESTINATION_OPTIONS: string[];
  static DESTINATION_DEFAULT: string;

  static CONTENT_TYPE_OPTIONS: string[];
  static CONTENT_TYPE_DEFAULT: string;

  static SERVER_OPTIONS: string[];
  static SERVER_DEFAULT: string;

  static METRICS_OPTIONS: string[];

  static DRIILED_DOWN_DASHLET_DASHBOARD: DashboardTO;

  static DRIILED_DOWN_DASHBOARDS: DashboardTO[];

}
