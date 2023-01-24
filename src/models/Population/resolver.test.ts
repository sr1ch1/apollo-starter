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
      .get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .responds()
      .withStatusCode(200)
      .withBody(
        `{
    "data": [
        {
            "ID Nation": "01000US",
            "Nation": "United States",
            "ID Year": 2020,
            "Year": "2020",
            "Population": 326569308,
            "Slug Nation": "united-states"
        },
        {
            "ID Nation": "01000US",
            "Nation": "United States",
            "ID Year": 2019,
            "Year": "2019",
            "Population": 324697795,
            "Slug Nation": "united-states"
        }
    ],
    "source": [
        {
            "measures": [
                "Population"
            ],
            "annotations": {
                "source_name": "Census Bureau",
                "source_description": "The American Community Survey (ACS) is conducted by the US Census and sent to a portion of the population every year.",
                "dataset_name": "ACS 5-year Estimate",
                "dataset_link": "http://www.census.gov/programs-surveys/acs/",
                "table_id": "B01003",
                "topic": "Diversity",
                "subtopic": "Demographics"
            },
            "name": "acs_yg_total_population_5",
            "substitutions": []
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
