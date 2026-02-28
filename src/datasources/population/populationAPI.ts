import { z } from 'zod';
import { RetryingRestDataSource } from '../../shared/utils/retryingRestDataSource';

export const PopulationsResponseSchema = z.object({
  annotations: z.object({
    dataset_link: z.string().url(),
    source_name: z.string(),
    topic: z.string(),
    source_description: z.string(),
    subtopic: z.string(),
    table_id: z.string(),
    dataset_name: z.string(),
  }),
  page: z.object({
    limit: z.number(),
    offset: z.number(),
    total: z.number(),
  }),
  columns: z.array(z.string()),
  data: z.array(
    z.object({
      'State ID': z.string(),
      State: z.string(),
      Year: z.number(),
      Population: z.number(),
    }),
  ).nonempty(),
});

export type PopulationsResponse = z.infer<typeof PopulationsResponseSchema>;

export interface IPopulationAPI {
  getPopulations(): Promise<PopulationsResponse>;
}

export class PopulationAPI extends RetryingRestDataSource implements IPopulationAPI {
  async getPopulations(): Promise<PopulationsResponse> {
    const data = await this.get(this.env.populationUrl);
    return PopulationsResponseSchema.parse(data);
  }
}
