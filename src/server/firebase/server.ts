import * as functions from 'firebase-functions';
import express from 'express';
import { build } from '../apollo/serverBuilder';
import { expressMiddleware } from '@as-integrations/express5';
import { ContextBuilder } from '../configuration/contextFactory';
import { EnvironmentFactory } from '../configuration/environmentFactory';

EnvironmentFactory.create();
const context = ContextBuilder();
const server = build();
const app = express();

(async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server, { context }));
})();
export const apolloServer = functions.https.onRequest(app);
