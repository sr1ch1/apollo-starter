/**
 * @group api
 */
import { PopulationAPI } from './populationAPI';

describe('populationAPI.getPopulations', () => {
  it('should return data properly', async () => {
    const populationAPI = new PopulationAPI();

    // if this call does not throw an error, we know the data
    // has passed zod's validation. We just have to do checks on the content.
    const populations = await populationAPI.getPopulations();

    expect(populations.data.length).toBeGreaterThan(0);
    expect(populations.columns.length).toBeGreaterThan(0);

    const firstRecord = populations.data[0];
    expect(firstRecord?.Population).toBeGreaterThan(0);
  });
});
