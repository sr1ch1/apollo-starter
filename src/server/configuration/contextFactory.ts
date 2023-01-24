import type { EnvironmentSchema } from './globalEnvironmentSchema';
import { IDataSources, buildDataSources } from '../../datasources';
import type { DataSourceConfig } from '@apollo/datasource-rest/dist/RESTDataSource';
import { EnvironmentFactory } from './environmentFactory';

export interface ContextValue {
  env: EnvironmentSchema;
  dataSources: IDataSources;
}

export const ContextBuilder = (config?: DataSourceConfig) => {
  const create = async (): Promise<ContextValue> => {
    const env = EnvironmentFactory.create();
    return {
      env,
      dataSources: config ? buildDataSources(config) : buildDataSources(),
    };
  };

  return create;
};
