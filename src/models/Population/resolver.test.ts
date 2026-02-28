/**
 * @group integration
 */
import { build } from '../../server/apollo/serverBuilder';
import gql from 'graphql-tag';
import { ContextBuilder } from '../../server/configuration/contextFactory';
import { FetcherStub } from '@sr1ch1/apollo-fetcher-stub';

const query = gql`
  query GetPopulations {
    populations {
      id
      nation
      population
      year
    }
  }
`;
describe('Population Resolver', () => {
  it('should resolve correctly', async () => {
    const stub = new FetcherStub();
    stub
      .get(
        'https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&drilldowns=State,Year&measures=Population',
      )
      .responds()
      .withStatusCode(200)
      .withBody(
        `{
    "annotations": {
        "dataset_link": "http://www.census.gov/programs-surveys/acs/",
        "source_name": "Census Bureau",
        "topic": "Diversity",
        "source_description": "The American Community Survey (ACS) is conducted by the US Census and sent to a portion of the population every year.",
        "subtopic": "Demographics",
        "table_id": "B01003",
        "dataset_name": "ACS 5-year Estimate"
    },
    "page": {
        "limit": 0,
        "offset": 0,
        "total": 52
    },
    "columns": [
        "State ID",
        "State",
        "Year",
        "Population"
    ],
    "data": [
        {
            "State ID": "04000US01",
            "State": "Alabama",
            "Year": 2021,
            "Population": 53853646.0
        },
        {
            "State ID": "04000US02",
            "State": "Alaska",
            "Year": 2021,
            "Population": 8074728.0
        }
    ]
}`,
        'application/json',
      );

    const builder = ContextBuilder(stub.fetcher);
    const contextValue = await builder();
    const testServer = build();
    const response = await testServer.executeOperation({ query }, { contextValue });
    expect(response).toMatchSnapshot();
  });
});
