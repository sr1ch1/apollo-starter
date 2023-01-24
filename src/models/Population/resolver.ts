import type { NationalPopulation } from '../__generated__/graphql';
import type { PopulationsResponse } from '../../datasources/population/populationAPI';

export const populationResolver = {
  Query: {
    populations: async (_, __, context): Promise<NationalPopulation[]> => {
      const result: PopulationsResponse = await context.dataSources.populationAPI.getPopulations();
      return result.data.map((record) => ({
        id: `${record['ID Nation']}_${record['ID Nation']}`,
        nation: record.Nation,
        year: Number(record.Year),
        population: record.Population,
      }));
    },
  },
};
