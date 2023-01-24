import { z } from 'zod';
import { RetryingRestDataSource } from '../../shared/utils/retryingRestDataSource';

const PopulationsResponseSchema = z.object({
  data: z.array(
    z.object({
      'ID Nation': z.string(),
      'ID Year': z.number(),
      'Slug Nation': z.string(),
      Nation: z.string(),
      Year: z.string(),
      Population: z.number(),
    }),
  ),
  source: z.array(
    z.object({
      measures: z.array(z.string()),
      annotations: z.object({
        source_name: z.string(),
        source_description: z.string(),
        dataset_name: z.string(),
        dataset_link: z.string().url(),
        table_id: z.string(),
        topic: z.string(),
        subtopic: z.string(),
      }),
      name: z.string(),
      substitutions: z.array(z.string()),
    }),
  ),
});

export type PopulationsResponse = z.infer<typeof PopulationsResponseSchema>;

export interface IPopulationAPI {
  getPopulations(): Promise<PopulationsResponse>;
}

export class PopulationAPI extends RetryingRestDataSource implements IPopulationAPI {
  override baseURL = 'https://datausa.io/api/';

  async getPopulations(): Promise<PopulationsResponse> {
    const data = await this.get('data?drilldowns=Nation&measures=Population');
    return PopulationsResponseSchema.parse(data);
  }
}
