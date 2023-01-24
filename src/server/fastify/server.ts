import Fastify from 'fastify';
import appService from './app';
import { EnvironmentFactory } from '../configuration/environmentFactory';
import fastifyApollo, {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { build } from '../apollo/serverBuilder';
import { ContextBuilder, ContextValue } from '../configuration/contextFactory';
import { EnvironmentEnumSchema } from '../configuration/globalEnvironmentSchema';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

const env = EnvironmentFactory.create();
const app = Fastify({ logger: true, forceCloseConnections: true });
app.register(appService);

const plugins = [
  fastifyApolloDrainPlugin(app),
  env.nodeEnv == EnvironmentEnumSchema.enum.production
    ? ApolloServerPluginLandingPageProductionDefault({
        footer: false,
      })
    : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
];

const apollo = build(plugins);
const context: ApolloFastifyContextFunction<ContextValue> = ContextBuilder();

async function closeGracefully(signal) {
  app.log.info(`terminating application because received signal ${signal}`);
  await app.close();
  process.kill(process.pid, signal);
}

(async () => {
  process.once('SIGINT', closeGracefully);
  process.once('SIGTERM', closeGracefully);
  await apollo.start();
  await app.register(fastifyApollo(apollo), {
    context,
  });

  app.listen({ port: env.port, host: env.host }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
})();
