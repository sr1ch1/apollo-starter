import type { IPopulationAPI } from './population/populationAPI';
import { PopulationAPI } from './population/populationAPI';
import type { DataSourceConfig } from '@apollo/datasource-rest/dist/RESTDataSource';

// the types of all available data sources
export interface IDataSources {
  populationAPI: IPopulationAPI;
}

// builder function to create all data sources.
export const buildDataSources = (config?: DataSourceConfig): IDataSources => ({
  populationAPI: new PopulationAPI(config),
});
