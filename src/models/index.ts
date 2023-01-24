import 'graphql-import-node';
import { mergeResolvers } from '@graphql-tools/merge';
import { infoResolver } from './Info/resolver';
import { populationResolver } from './Population/resolver';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';

// aggregation of all available resolvers.
export const resolvers = mergeResolvers([infoResolver, populationResolver]);

const typesArray = loadFilesSync(path.join(__dirname, './**'), { extensions: ['graphql'] });
export const typeDefs = mergeTypeDefs(typesArray);
