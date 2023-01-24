import { readFileSync } from 'fs';
import path from 'path';
import type { FastifyPluginAsync } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import fp from 'fastify-plugin';

const { version } = JSON.parse(
  readFileSync(path.join(__dirname, '../../../../package.json'), 'utf-8'),
);

const versionResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    version: { type: 'string' },
  },
  required: ['status', 'version'],
} as const;

const versionPlugin: FastifyPluginAsync = async (fastify, _options) => {
  fastify.get<{ Reply: FromSchema<typeof versionResponseSchema> }>(
    '/version',
    {
      schema: {
        response: { 200: versionResponseSchema },
      },
    },
    async (_, reply): Promise<void> => {
      await reply.status(200).send({
        status: 'ok',
        version: version,
      });
    },
  );
};

export default fp(versionPlugin);
