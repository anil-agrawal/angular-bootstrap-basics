import { BaseFilter } from '../../interfaces/base-filter';
import { BaseChart } from '../../layout/chart-widgets/base-chart';
import { RestResponse } from '../../to/rest-response';
import { BaseComponent } from '../../util/base-component';
import { LocalStorageData } from '../../util/local-storage-data';
import { Logger } from '../../util/logger';
import { AppUtil } from './../../util/app-util';
import { RestUtilService } from '../common/rest-util.service';
import { Injectable } from '@angular/core';
import { ArrayMapHelper } from './../../util/array-map-helper';
import { AdvanceFilterTO } from './../../to/filter/advance-filter.to';


declare var $: any; // JQuery

@Injectable()
export class ChartService {

  fetchChartData(caller: any): void {
    try {
      const component = <BaseChart>caller;
      let filter = this.fetchFilters(component);
      filter = this.formatFilter(filter, component);
      const queryString = $.param(filter);
      /*
      if (component._prevQueryString === queryString) {
        // No change in filter, no need to fetch chart data
        component.onDataFetchWithNoChange();
        return;
      } else {
        component._prevQueryString = queryString;
      }
      */
      const apiURL = AppUtil.restURLUtilService.CHART_DATA + '?' + queryString;
      AppUtil.restUtilService.get(apiURL, this.onChartDataFetch, caller);
    } catch (e) {
      Logger.error(e);
    }
  }

  fetchRequests(caller: any, baseChart: BaseChart, advanceFilter: AdvanceFilterTO): void {
    try {
      let filter = this.fetchFilters(baseChart);
      filter = this.copyFromAdvanceFilter(filter, advanceFilter);
      filter = this.formatFilter(filter, baseChart);
      if (advanceFilter.metrics.toUpperCase() === 'ALERTS') {
        filter['metrics'] = advanceFilter.metrics;
      }else{
        filter['metrics'] = 'REQUESTS';
      }
      const queryString = $.param(filter); const apiURL = AppUtil.restURLUtilService.CHART_DATA + '?' + queryString;
      AppUtil.restUtilService.get(apiURL, this.onFetchRequests, caller);
    } catch (e) {
      Logger.error(e);
    }
  }

  fetchChartDataFromElse(baseChart: BaseChart, caller: any): void {
    try {
      let filter = this.fetchFilters(baseChart);
      filter = this.formatFilter(filter, baseChart);
      const queryString = $.param(filter);
      const apiURL = AppUtil.restURLUtilService.CHART_DATA + '?' + queryString;
      AppUtil.restUtilService.get(apiURL, this.onChartDataFetchFromElse, { 'caller': caller, 'params': filter });
    } catch (e) {
      Logger.error(e);
    }
  }

  copyFromAdvanceFilter(filter:any, data: AdvanceFilterTO) :any{
    //Time filter override rule
    if (data.useFilterTime === null || data.useFilterTime === undefined || data.useFilterTime === false) {
      filter['fromDate'] = data.fromTime;
      filter['toDate'] = data.toTime;
    }

    // Dimension filter override rule
    if (data.additionalDimension !== null && data.additionalDimension !== undefined && data.additionalDimension === true) {
      //Server Dimension filter override rule
      if (data.servers !== undefined && data.servers.length > 0) {
        if (filter['servers'] === undefined || filter['servers'] === null) {
          filter['servers'] = data.servers;
        } else {
          filter['servers'] = ArrayMapHelper.addAllInList(filter['servers'], data.servers);
        }
      }

      //Source Dimension filter override rule
      if (data.sources !== undefined && data.sources.length > 0) {
        if (filter['sources'] === undefined || filter['sources'] === null) {
          filter['sources'] = data.sources;
        } else {
          filter['sources'] = ArrayMapHelper.addAllInList(filter['sources'], data.sources);
        }
      }

      //Format Dimension filter override rule
      if (data.formats !== undefined && data.formats.length > 0) {
        if (filter['formats'] === undefined || filter['formats'] === null) {
          filter['formats'] = data.formats;
        } else {
          filter['formats'] = ArrayMapHelper.addAllInList(filter['formats'], data.formats);
        }
      }

      //Destination Dimension filter override rule
      if (data.destinations !== undefined && data.destinations.length > 0) {
        if (filter['destinations'] === undefined || filter['destinations'] === null) {
          filter['destinations'] = data.destinations;
        } else {
          filter['destinations'] = ArrayMapHelper.addAllInList(filter['destinations'], data.destinations);
        }
      }

      //Content Type Dimension filter override rule
      if (data.contentTypes !== undefined && data.contentTypes.length > 0) {
        if (filter['contentTypes'] === undefined || filter['contentTypes'] === null) {
          filter['contentTypes'] = data.contentTypes;
        } else {
          filter['contentTypes'] = ArrayMapHelper.addAllInList(filter['contentTypes'], data.contentTypes);
        }
      }

      //Response Code Dimension filter override rule
      if (data.responseCodes !== undefined && data.responseCodes.length > 0) {
        if (filter['responseCodes'] === undefined || filter['responseCodes'] === null) {
          filter['responseCodes'] = data.responseCodes;
        } else {
          filter['responseCodes'] = ArrayMapHelper.addAllInList(filter['responseCodes'], data.responseCodes);
        }
      }
    } 
    if (data.removeAggregatedFilters !== null && data.removeAggregatedFilters !== undefined && data.removeAggregatedFilters === true) {
      if (filter['distributionType'] !== undefined && filter['distributionType'] !== null) {
        ArrayMapHelper.removeFromMap(filter, 'distributionType');
      }
      if (filter['groupBy'] !== undefined && filter['groupBy'] !== null) {
        ArrayMapHelper.removeFromMap(filter, 'groupBy');
      }
    }
    if(data.granularity!==undefined && data.granularity!==null && data.granularity.length>0){
      filter['granularity'] = data.granularity;
    }
    if (data.fetchNext !== undefined && data.fetchNext !== null && data.fetchNext === true) { 
      filter['fetchNext'] = data.fetchNext;
    }
    return filter;
  }


  fetchFilters(component: BaseChart): any {
    const uid = component.uid;
    let filter = { };
    if (component.parentChart !== null && component.parentChart !== undefined) {
      filter = ArrayMapHelper.addAllInMap(filter, this.fetchFilters(component.parentChart));
    }

    // Note : At a moment only one filter is applicable. Either distributionType or groupBy
    if (component.chart.useDistributionOnly !== undefined && component.chart.useDistributionOnly !== null && component.chart.useDistributionOnly === true) {
      filter['distributionType'] = component.chart['distribution'];
      filter = ArrayMapHelper.removeFromMap(filter, 'groupBy');
    }

    if (component.chart.useGroupBy !== undefined && component.chart.useGroupBy !== null && component.chart.useGroupBy === true) {
      filter['groupBy'] = component.chart.groupBy;
      filter = ArrayMapHelper.removeFromMap(filter, 'distributionType');
    }

    filter['metrics'] = component.chart.metrics;

    const headerFilterUID = uid.substr(0, uid.indexOf('.dashlet.')) + '.header-filter';
    const headerFilter = <BaseFilter>AppUtil.componentHolderService.get(headerFilterUID);
    if (headerFilter !== null && headerFilter !== undefined) {
      headerFilter.populateFilter(filter);
    }

    const popupFilterUID = uid + '.popup-filter';
    const popupFilter = <BaseFilter>AppUtil.componentHolderService.get(popupFilterUID);
    if (popupFilter !== null && popupFilter !== undefined) {
      popupFilter.populateFilter(filter);
    }

    if (component.filter !== undefined && component.filter !== null) { 
      filter = this.copyFromAdvanceFilter(filter, component.filter);
    }
    return filter;
  }

  private formatFilter(filterObj: any, caller: BaseChart) {
    const dimensionFilter = {};

    //Format sources as per requirement
    const sources = filterObj['sources'];
    if (sources !== null && sources !== undefined && sources.length>0) {
      const sourcesFilter = [];
      for (const indx in sources) {
        if (typeof sources[indx]!=='string') {
          sourcesFilter.push(sources[indx]['value']);
        } else {
          sourcesFilter.push(sources[indx]);
        }
      }
      dimensionFilter['source'] = sourcesFilter;
    }

    //Format Response Code as per requirement
    const responseCodes = filterObj['responseCodes'];
    if (responseCodes !== null && responseCodes !== undefined && responseCodes.length > 0) {
      const responseCodesFilter = [];
      for (const indx in responseCodes) {
        if (typeof responseCodes[indx] !== 'string') {
          responseCodesFilter.push(responseCodes[indx]['value']);
        } else {
          responseCodesFilter.push(responseCodes[indx]);
        }
      }
      dimensionFilter['responseCode'] = responseCodesFilter;
    }

    //Format servers as per requirement
    const servers = filterObj['servers'];
    if (servers !== null && servers !== undefined && servers.length > 0) {
      const serversFilter = [];
      for (const indx in servers) {
        if (typeof servers[indx] !== 'string') {
          serversFilter.push(servers[indx]['value']);
        }else{
          serversFilter.push(servers[indx]);
        }
      }
      dimensionFilter['server'] = serversFilter;
    }

    //Format destinations as per requirement
    const destinations = filterObj['destinations'];
    if (destinations !== null && destinations !== undefined && destinations.length > 0) {
      const destinationsFilter = [];
      for (const indx in destinations) {
        if (typeof destinations[indx] !== 'string') {
          destinationsFilter.push(destinations[indx]['value']);
        } else {
          destinationsFilter.push(destinations[indx]);
        }
      }
      dimensionFilter['destination'] = destinationsFilter;
    }

    //Format formats as per requirement
    const formats = filterObj['formats'];
    if (formats !== null && formats !== undefined && formats.length > 0) {
      const formatsFilter = [];
      for (const indx in formats) {
        if (typeof formats[indx] !== 'string') {
          formatsFilter.push(formats[indx]['value']);
        } else {
          formatsFilter.push(formats[indx]);
        }
      }
      dimensionFilter['format'] = formatsFilter;
    }

    //Format contentTypes as per requirement
    const contentTypes = filterObj['contentTypes'];
    if (contentTypes !== null && contentTypes !== undefined && contentTypes.length > 0) {
      const contentTypesFilter = [];
      for (const indx in contentTypes) {
        if (typeof contentTypes[indx] !== 'string') {
          contentTypesFilter.push(contentTypes[indx]['value']);
        } else {
          contentTypesFilter.push(contentTypes[indx]);
        }
      }
      dimensionFilter['contentType'] = contentTypesFilter;
    }

    //Format metrics as per requirement (Mandatory filter)
    let filter = { 'metrics': filterObj['metrics']};

    //Format dimensionFilter as per requirement
    if (Object.keys(dimensionFilter).length === 0 && dimensionFilter.constructor === Object) {
      // In case of no dimension don't add the dimension object at all in query param
    }else{
      filter['filter'] = JSON.stringify(dimensionFilter);
    }

    //Format distributionType as per requirement
    if (filterObj['distributionType'] !== undefined && filterObj['distributionType'] !== null) {
      filter['distributionType'] = filterObj['distributionType'];
    }

    //Format groupBy as per requirement
    if (filterObj['groupBy'] !== undefined && filterObj['groupBy'] !== null) {
      filter['groupBy'] = filterObj['groupBy'];
    }

    //Format fromDate as per requirement
    if (filterObj['fromDate'] !== undefined && filterObj['fromDate'] !== null) {
      filter['fromDate'] = filterObj['fromDate'];
      if (typeof (filter['fromDate']) !== 'number') {
        filter['fromDate'] = (filter['fromDate']).toLowerCase().replace(/ /g, '');
      }
    }

    //Format toDate as per requirement
    if (filterObj['toDate'] !== undefined && filterObj['toDate'] !== null) {
      filter['toDate'] = filterObj['toDate'];
    }

    //Format granularity as per requirement
    if (filterObj['granularity'] !== undefined && filterObj['granularity'] !== null) {
      filter['granularity'] = filterObj['granularity'];
    }

    //Format fetchNext as per requirement
    if (filterObj['fetchNext'] !== undefined && filterObj['fetchNext'] !== null) {
      filter['fetchNext'] = filterObj['fetchNext'];
    }
    
    //Format offset as per requirement
    if (filterObj['offset'] !== undefined && filterObj['offset']!==null) {
      filter['offset'] = filterObj['offset'];
    }

    //Format size as per requirement
    if (filterObj['size'] !== undefined && filterObj['size'] !== null) {
      filter['size'] = filterObj['size'];
    }

    // filter = this.performDashletSpecificOperations(filter, caller);
    filter = this.useDefaultFiltersIncaseOfNoValueProvided(filter, caller);

    return filter;
  }

  // Not in use, required functionality handled by server api
  private performDashletSpecificOperations(filterObj: any, caller: BaseChart) {
    if (filterObj['metrics'] === 'REQUEST_DISTRIBUTION'){
      if ((caller.chart['title']).indexOf('Source')>-1){
        filterObj['distributionType'] = 'source';
      } else if ((caller.chart['title']).indexOf('Format') > -1){
        filterObj['distributionType'] = 'format';
      }
    }
    return filterObj;
  }

  private useDefaultFiltersIncaseOfNoValueProvided(filterObj: any, caller: BaseChart) {
    if (filterObj['fromDate'] === undefined || filterObj['fromDate'] === null || filterObj['fromDate'] ==='') {
      filterObj['fromDate'] = 'last1hour';
    }
    return filterObj;
  }

  onChartDataFetch(response: RestResponse, caller: any): void {
    if (response.status === 200 && response.isBodyAsJSON()) {
      (<BaseChart>caller).onDataFetch(response.responseBodyAsJson());
    } else {
      AppUtil.toast.error('Error while fetching chart data', 'Error');
    }
  }

  onFetchRequests(response: RestResponse, caller: any): void {
    if (response.status === 200 && response.isBodyAsJSON()) {
    } else {
      AppUtil.toast.error('Error while fetching requests data', 'Error');
    }
  }

  onChartDataFetchFromElse(response: RestResponse, data: { caller: any, params: any }): void {
    if (response.status === 200 && response.isBodyAsJSON()) {
      data.caller.onDataFetch(response.responseBodyAsJson(), data.params);
    } else {
      AppUtil.toast.error('Error while fetching chart data', 'Error');
    }
  }

}
