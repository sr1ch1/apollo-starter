import type { NationalPopulation } from '../__generated__/graphql';
import type { PopulationsResponse } from '../../datasources/population/populationAPI';

export const populationResolver = {
  Query: {
    populations: async (_, __, context): Promise<NationalPopulation[]> => {
      const result: PopulationsResponse = await context.dataSources.populationAPI.getPopulations();
      return result.data.map((record) => ({
        id: record['State ID'],
        nation: record.State,
        year: Number(record.Year),
        population: record.Population,
      }));
    },
  },
};
