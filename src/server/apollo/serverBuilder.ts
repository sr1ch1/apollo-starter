import { ApolloServer } from '@apollo/server';
import type { ContextValue } from '../configuration/contextFactory';
import { resolvers, typeDefs } from '../../models';
import type { ApolloServerPlugin } from '@apollo/server/src/externalTypes/plugins';

export const build = (plugins: ApolloServerPlugin<ContextValue>[] = []) =>
  new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    plugins,
  });
