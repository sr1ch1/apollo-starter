/**
 * @group unit
 */
import * as process from 'process';
import { EnvironmentEnumSchema } from './globalEnvironmentSchema';
import { EnvironmentFactory } from './environmentFactory';

describe('environment', () => {
  it('should load properly', async () => {
    process.env['PORT'] = '3333';
    process.env['MAX_EVENT_LOOP_DELAY'] = '4500';
    process.env['MAX_HEAP_USED_BYTES'] = '99999';
    process.env['MAX_RSS_BYTES'] = '111111';
    process.env['MAX_REQUEST'] = '20';
    process.env['TIME_WINDOW'] = '1 day';
    process.env['FETCH_RETRIES'] = '10';
    process.env['FETCH_FACTOR'] = '1.21212';
    process.env['FETCH_MIN_TIMEOUT'] = '345';
    process.env['FETCH_MAX_TIMEOUT'] = '6789';

    const env = EnvironmentFactory.create();

    expect(env.nodeEnv).toBe(EnvironmentEnumSchema.enum.test);
    expect(env.port).toBe(3333);
    expect(env.maxEventLoopDelay).toBe(4500);
    expect(env.maxHeapUsedBytes).toBe(99999);
    expect(env.maxRssBytes).toBe(111111);
    expect(env.maxRequest).toBe(20);
    expect(env.timeWindow).toBe('1 day');
    expect(env.fetchRetries).toBe(10);
    expect(env.fetchFactor).toBeCloseTo(1.21212);
    expect(env.fetchMinTimeout).toBe(345);
    expect(env.fetchMaxTimeout).toBe(6789);
  });

  it('should not load with invalid value', () => {
    process.env['TIME_WINDOW'] = '1 gram';
    expect(() => EnvironmentFactory.create(true)).toThrow();
  });
});
