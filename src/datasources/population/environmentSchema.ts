import { z } from 'zod';

// this is the environment that is specific to the population API
export const environmentSchema = z.object({
  // the population API URL
  populationUrl: z
    .string()
    .url()
    .default(
      'https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&drilldowns=State,Year&measures=Population',
    ),
});
