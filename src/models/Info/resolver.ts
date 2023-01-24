import type { ServerInfo } from '../__generated__/graphql';
import { readFileSync } from 'fs';
import path from 'path';

const { name } = JSON.parse(readFileSync(path.join(__dirname, '../../../package.json'), 'utf-8'));

const serverInfo: ServerInfo = {
  id: '1',
  name,
  status: 'ok',
};
export const infoResolver = {
  Query: {
    serverInfo: () => serverInfo,
  },
};
