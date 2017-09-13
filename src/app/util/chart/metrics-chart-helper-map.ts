import { REQUESTS$ChartHelper } from './requests_chart-helper';
import { RESPONSE$TIME$ChartHelper } from './response_time_chart-helper';
import { BYTES$SERVED$ChartHelper } from './bytes_served_chart-helper';
import { BANDWIDTH$SERVED$ChartHelper } from './bandwidth_served_chart-helper';
import { NUMBER$OF$REQUESTS$ChartHelper } from './number_of_requests_chart-helper';
import { RESPONSES$VS$REQUESTS$ChartHelper } from './responses_vs_requests_chart-helper';
import { REQUEST$DISTRIBUTION$ChartHelper } from './request_distribution_chart-helper';
import { REQUEST$DISTRIBUTION$By$Response$Code$ChartHelper } from './request_distribution_by_response_code_chart-helper';
import { HTTP$RESPONSE$CODES$ChartHelper } from './http_response_codes_chart-helper';
import { ALERTS$ChartHelper } from './alerts_chart-helper';
import { ALERTS$STATS$ChartHelper } from './alerts_stats_chart-helper';
import { ChartHelper } from './chart-helper';
import { REQUESTS$VS$AVG$RESPONSE$ChartHelper } from './requests_vs_avg_response_chart-helper';
import { REQUESTS$VS$SERVER$AVAILABILITY$ChartHelper } from './requests_vs_server_availability_chart-helper';
import { REQUESTS$VS$HTTP$RESPONSE$FAILURES$ChartHelper } from './requests_vs_http_response_failures_chart-helper';
import { REQUESTS$VS$ALERTS$ChartHelper } from './requests_vs_alerts_chart-helper';
import { SERVER$HEALTH$ChartHelper } from './server_health_chart-helper';
import { REQUESTS$VS$BYTES$SERVED$ChartHelper } from './requests_vs_bytes_served_chart-helper';
import { REQUESTS$VS$AVG$BANDWIDTH$ChartHelper } from './requests_vs_avg_bandwidth_chart-helper';
import { DistributionChartHelper } from './distribution-chart-helper';
import { DashletTO } from './../../to/dashboard/dashlet.to';
import { MULTIPLE$STATS$ChartHelper } from './multiple_stats_chart-helper';
import { NUMBER$OF$ERROR$REQUESTS$ChartHelper } from './number_of_error_requests_chart-helper';
import { GroupChartHelper } from './group-chart-helper';
import { HTTP$RESPONSE$CODES$DistributionChartHelper } from './http_response_codes_distribution-chart-helper';
import { HTTP$RESPONSE$CODES$GroupChartHelper } from './http_response_codes_group-chart-helper';
import { ALERTS$STATS$GroupChartHelper } from './alerts_stats_group-chart-helper';
import { SERVER$AVAILABILITY$ChartHelper } from './server_availability_chart-helper';

export class MetricsChartHelperMap {

    private static map = {
        // Metrics Chart Helpers
        'REQUESTS': new REQUESTS$ChartHelper(),
        'RESPONSE_TIME': new RESPONSE$TIME$ChartHelper(),
        'BYTES_SERVED': new BYTES$SERVED$ChartHelper(),
        'BANDWIDTH_SERVED': new BANDWIDTH$SERVED$ChartHelper(),
        'NUMBER_OF_REQUESTS': new NUMBER$OF$REQUESTS$ChartHelper(),
        'NUMBER_OF_ERROR_REQUESTS': new NUMBER$OF$ERROR$REQUESTS$ChartHelper(),
        'RESPONSES_VS_REQUESTS': new RESPONSES$VS$REQUESTS$ChartHelper(),
        'REQUEST_DISTRIBUTION': new REQUEST$DISTRIBUTION$ChartHelper(),
        'ERROR_REQUEST_DISTRIBUTION': new REQUEST$DISTRIBUTION$ChartHelper(),
        'HTTP_RESPONSE_CODES': new HTTP$RESPONSE$CODES$ChartHelper(),
        'ALERTS': new ALERTS$ChartHelper(),
        'ALERTS_STATS': new ALERTS$STATS$ChartHelper(),
        'REQUESTS_VS_AVG_RESPONSE': new REQUESTS$VS$AVG$RESPONSE$ChartHelper(),
        'REQUESTS_VS_SERVER_AVAILABILITY': new REQUESTS$VS$SERVER$AVAILABILITY$ChartHelper(),
        'REQUESTS_VS_HTTP_RESPONSE_CODES': new REQUESTS$VS$HTTP$RESPONSE$FAILURES$ChartHelper(),
        'REQUESTS_VS_ALERTS': new REQUESTS$VS$ALERTS$ChartHelper(),
        'SERVER_HEALTH': new SERVER$HEALTH$ChartHelper(),
        'HEALTH': new SERVER$HEALTH$ChartHelper(),
        'REQUESTS_VS_AVG_BANDWIDTH': new REQUESTS$VS$AVG$BANDWIDTH$ChartHelper(),
        'REQUESTS_VS_BYTES_SERVED': new REQUESTS$VS$BYTES$SERVED$ChartHelper(),
        'MULTIPLE_STATS': new MULTIPLE$STATS$ChartHelper(),
        'SERVER_AVAILABILITY': new SERVER$AVAILABILITY$ChartHelper(),

        // Metrics Distribution Chart Helpers
        'REQUESTS_DISTRIBUTION': new DistributionChartHelper(),
        'RESPONSE_TIME_DISTRIBUTION': new DistributionChartHelper(),
        'BYTES_SERVED_DISTRIBUTION': new DistributionChartHelper(),
        'BANDWIDTH_SERVED_DISTRIBUTION': new DistributionChartHelper(),
        'NUMBER_OF_REQUESTS_DISTRIBUTION': new DistributionChartHelper(),
        'NUMBER_OF_ERROR_REQUESTS_DISTRIBUTION': new DistributionChartHelper(),
        'RESPONSES_VS_REQUESTS_DISTRIBUTION': new DistributionChartHelper(),
        'REQUEST_DISTRIBUTION_DISTRIBUTION': new REQUEST$DISTRIBUTION$ChartHelper(), 'REQUEST_DISTRIBUTION_DISTRIBUTION_BY_RESPONSECODE': new REQUEST$DISTRIBUTION$By$Response$Code$ChartHelper(),
        'ERROR_REQUEST_DISTRIBUTION_DISTRIBUTION': new REQUEST$DISTRIBUTION$ChartHelper(), 'ERROR_REQUEST_DISTRIBUTION_DISTRIBUTION_BY_RESPONSECODE': new REQUEST$DISTRIBUTION$By$Response$Code$ChartHelper(),
        'HTTP_RESPONSE_CODES_DISTRIBUTION': new HTTP$RESPONSE$CODES$DistributionChartHelper(),
        'ALERTS_DISTRIBUTION': new DistributionChartHelper(),
        'ALERTS_STATS_DISTRIBUTION': new DistributionChartHelper(),
        'REQUESTS_VS_AVG_RESPONSE_DISTRIBUTION': new DistributionChartHelper(),
        'REQUESTS_VS_SERVER_AVAILABILITY_DISTRIBUTION': new DistributionChartHelper(),
        'REQUESTS_VS_HTTP_RESPONSE_CODES_DISTRIBUTION': new DistributionChartHelper(),
        'REQUESTS_VS_ALERTS_DISTRIBUTION': new DistributionChartHelper(),
        'SERVER_HEALTH_DISTRIBUTION': new DistributionChartHelper(),
        'HEALTH_DISTRIBUTION': new SERVER$HEALTH$ChartHelper(),
        'REQUESTS_VS_AVG_BANDWIDTH_DISTRIBUTION': new DistributionChartHelper(),
        'REQUESTS_VS_BYTES_SERVED_DISTRIBUTION': new DistributionChartHelper(),
        'MULTIPLE_STATS_DISTRIBUTION': new MULTIPLE$STATS$ChartHelper(),
        'SERVER_AVAILABILITY_DISTRIBUTION': new DistributionChartHelper(),

        // Metrics GROUP Chart Helpers
        'REQUESTS_GROUP': new GroupChartHelper(),
        'RESPONSE_TIME_GROUP': new GroupChartHelper(),
        'BYTES_SERVED_GROUP': new GroupChartHelper(),
        'BANDWIDTH_SERVED_GROUP': new GroupChartHelper(),
        'NUMBER_OF_REQUESTS_GROUP': new GroupChartHelper(),
        'NUMBER_OF_ERROR_REQUESTS_GROUP': new GroupChartHelper(),
        'RESPONSES_VS_REQUESTS_GROUP': new GroupChartHelper(),
        'REQUEST_DISTRIBUTION_GROUP': new GroupChartHelper(),
        'ERROR_REQUEST_DISTRIBUTION_GROUP': new GroupChartHelper(),
        'HTTP_RESPONSE_CODES_GROUP': new HTTP$RESPONSE$CODES$GroupChartHelper(),
        'ALERTS_GROUP': new GroupChartHelper(),
        'ALERTS_STATS_GROUP': new ALERTS$STATS$GroupChartHelper(),
        'REQUESTS_VS_AVG_RESPONSE_GROUP': new GroupChartHelper(),
        'REQUESTS_VS_SERVER_AVAILABILITY_GROUP': new GroupChartHelper(),
        'REQUESTS_VS_HTTP_RESPONSE_CODES_GROUP': new GroupChartHelper(),
        'REQUESTS_VS_ALERTS_GROUP': new GroupChartHelper(),
        'SERVER_HEALTH_GROUP': new GroupChartHelper(),
        'HEALTH_GROUP': new SERVER$HEALTH$ChartHelper(),
        'REQUESTS_VS_AVG_BANDWIDTH_GROUP': new GroupChartHelper(),
        'REQUESTS_VS_BYTES_SERVED_GROUP': new GroupChartHelper(),
        'MULTIPLE_STATS_GROUP': new GroupChartHelper(),
        'SERVER_AVAILABILITY_GROUP': new GroupChartHelper(),
    };

    static fetchChartHelper(dashlet: DashletTO): ChartHelper {
        let metrics = dashlet.metrics.toUpperCase();
        let chartHelper: ChartHelper;
        if (dashlet.type==='multiple_stat') {
            chartHelper = MetricsChartHelperMap.map['MULTIPLE_STATS'];
        }else if (dashlet.useDistributionOnly !== undefined && dashlet.useDistributionOnly !== null && dashlet.useDistributionOnly === true){
            chartHelper = MetricsChartHelperMap.map[metrics + '_DISTRIBUTION' + '_BY_' + dashlet.distribution.toUpperCase()];
            if (chartHelper === undefined || chartHelper === null) {
                chartHelper = MetricsChartHelperMap.map[metrics + '_DISTRIBUTION'];
            }
        } else if (dashlet.useGroupBy !== undefined && dashlet.useGroupBy !== null && dashlet.useGroupBy === true) {
            chartHelper = MetricsChartHelperMap.map[metrics + '_GROUP' + '_BY_' + dashlet.groupBy.toUpperCase()];
            if (chartHelper === undefined || chartHelper === null) {
                chartHelper = MetricsChartHelperMap.map[metrics + '_GROUP'];
            }
        } else {
            chartHelper = MetricsChartHelperMap.map[metrics];
        }
        return chartHelper;
    }
}
