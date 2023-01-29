import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import type { ContextValue } from '../configuration/contextFactory';
import { resolvers, typeDefs } from '../../models';

export const build = (plugins: ApolloServerPlugin<ContextValue>[] = []) =>
  new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    plugins,
  });
