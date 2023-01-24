/**
 * @group unit
 */
import { ContextBuilder } from './contextFactory';
import { EnvironmentEnumSchema } from './globalEnvironmentSchema';

describe('contextFactory', () => {
  it('should be created successfully', async () => {
    const ctxBuilder = ContextBuilder();
    const ctx = await ctxBuilder();

    expect(ctx.env.nodeEnv).toBe(EnvironmentEnumSchema.enum.test);
    expect(ctx.dataSources).toBeDefined();
    expect(ctx.dataSources.populationAPI).toBeDefined();
  });
});
