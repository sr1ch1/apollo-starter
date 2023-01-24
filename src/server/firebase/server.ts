import * as functions from 'firebase-functions';
const express = require('express');
import { build } from '../apollo/serverBuilder';
import { expressMiddleware } from '@apollo/server/express4';
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
