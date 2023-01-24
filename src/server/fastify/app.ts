import UnderPressure from '@fastify/under-pressure';
import Sensible from '@fastify/sensible';
import { version } from './routes';
import { EnvironmentFactory } from '../configuration/environmentFactory';
export default async function (fastify, _options) {
  await fastify.register(Sensible);

  const { maxEventLoopDelay, maxHeapUsedBytes, maxRssBytes, maxRequest, timeWindow } =
    EnvironmentFactory.create();
  await fastify.register(UnderPressure, {
    maxEventLoopDelay,
    maxHeapUsedBytes,
    maxRssBytes,
    maxEventLoopUtilization: 0.98,
  });

  await fastify.register(import('@fastify/rate-limit'), {
    max: maxRequest,
    timeWindow,
  });

  await fastify.register(version);
}
