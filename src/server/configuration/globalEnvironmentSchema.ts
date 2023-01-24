import { z } from 'zod';
import { environmentSchema as populationEnvSchema } from '../../datasources/population/environmentSchema';
import { asFloat, asInteger } from '../../shared/utils/stringUtils';
import { zx } from '../../shared/utils/zodExtensions';

// supported environments
export const EnvironmentEnumSchema = z.enum(['test', 'development', 'staging', 'production']);

// this is the minimal environment schema the server needs.
const coreEnvironmentSchema = z.object({
  // environment type used by the node application
  nodeEnv: EnvironmentEnumSchema.default(EnvironmentEnumSchema.enum.development),

  // this specifies an IP port and its valid range
  port: z.preprocess(asInteger, z.number().gte(1).lt(65536).default(4000)),

  // this specifies the host to listen to
  host: z.string().default('0.0.0.0'),

  // time between events that may pass before the server refuses new requests
  maxEventLoopDelay: z.preprocess(asInteger, z.number().positive().default(1000)),

  // maximum allowed heap usage in bytes before the server refuses new requests
  maxHeapUsedBytes: z.preprocess(asInteger, z.number().positive().default(1073741824)),

  // maximum allowed total memory usage in bytes before the server refuses new requests
  maxRssBytes: z.preprocess(asInteger, z.number().positive().default(1073741824)),

  // rate limiter: maximum number of request to make before rate limiting kicks in.
  maxRequest: z.preprocess(asInteger, z.number().positive().default(1000)),

  // rate limiter: time window to look at when counting the number of requests of a user
  timeWindow: zx.ms(),

  // number of retries when communicating with other REST services and a request times out
  fetchRetries: z.preprocess(asInteger, z.number().positive().default(5)),

  // fetch factor to be used when communicating with other REST services and a request times out
  // an exponential backoff strategy will be used. starting with minTimeout up to maxTimeout
  // with the given number of retries. factor ensures that the retries are distributed exponentially
  // within this range.
  // This formula will be used:
  // Sum[100*x^k, {k, 0, 4}] = 30 * 1000
  // where k is the number of retries-1 and x is the factor.
  // the result can be calculated here if you need different parameters:
  // https://www.wolframalpha.com/input?i=Sum%5B100*x%5Ek%2C+%7Bk%2C+0%2C+4%7D%5D+%3D+30+*+1000
  fetchFactor: z.preprocess(asFloat, z.number().positive().default(3.8626)),

  // The number of milliseconds before starting the first retry (100ms)
  fetchMinTimeout: z.preprocess(asInteger, z.number().positive().default(100)),

  // The maximum number of milliseconds between two retries (30 seconds)
  fetchMaxTimeout: z.preprocess(
    asInteger,
    z
      .number()
      .positive()
      .default(30 * 1000),
  ),
});

// we merge the domain specific environment schemas here into one global schema.
export const globalEnvironmentSchema = coreEnvironmentSchema.merge(populationEnvSchema);
export type EnvironmentSchema = z.infer<typeof globalEnvironmentSchema>;
