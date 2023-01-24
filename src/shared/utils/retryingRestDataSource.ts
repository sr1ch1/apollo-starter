import fetch from 'make-fetch-happen';
import { RESTDataSource } from '@apollo/datasource-rest';
import { EnvironmentFactory } from '../../server/configuration/environmentFactory';
import type { DataSourceConfig } from '@apollo/datasource-rest/dist/RESTDataSource';

export class RetryingRestDataSource extends RESTDataSource {
  constructor(config?: DataSourceConfig, env = EnvironmentFactory.create()) {
    super({
      ...{
        fetch: fetch.defaults({
          retry: {
            retries: env.fetchRetries,
            factor: env.fetchFactor,
            minTimeout: env.fetchMinTimeout,
            maxTimeout: env.fetchMaxTimeout,
            randomize: true,
          },
        }),
      },
      ...config,
    });
  }
}
