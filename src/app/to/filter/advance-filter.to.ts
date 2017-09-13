import { CommonFilterTO } from './common-filter.to'

export class AdvanceFilterTO extends CommonFilterTO{
  additionalDimension: boolean;
  removeAggregatedFilters: boolean;
  fetchNext: boolean;
  sources: string[];
  servers: string[];
  formats: string[];
  contentTypes: string[];
  destinations: string[];
  responseCodes: string[];
  granularity: string;
}
