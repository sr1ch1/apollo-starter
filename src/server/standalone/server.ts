import { startStandaloneServer } from '@apollo/server/standalone';
import { EnvironmentFactory } from '../configuration/environmentFactory';
import { ContextValue, ContextBuilder } from '../configuration/contextFactory';
import { build } from '../apollo/serverBuilder';

const env = EnvironmentFactory.create();
const context = ContextBuilder();

(async () => {
  const server = build();
  const { url } = await startStandaloneServer<ContextValue>(server, {
    context,
    listen: { port: env.port },
  });
  console.log(`Server ready at: ${url}`);
})();
