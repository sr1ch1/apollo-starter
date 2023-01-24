import { z } from 'zod';

// this is the environment that is specific to the population API
export const environmentSchema = z.object({
  // the population API URL
  populationUrl: z
    .string({ required_error: 'URL for population API is required' })
    .url()
    .default('https://datausa.io/api/data?drilldowns=Nation&measures=Population'),
});
