/**
 * @group unit
 */
import { build } from './serverBuilder';
import { fastifyApolloDrainPlugin } from '@as-integrations/fastify';
import Fastify from 'fastify';

describe('serverBuilder', () => {
  it('should build a server without plugins', () => {
    const apollo = build();
    expect(apollo).not.toBeNull();
  });

  it('should build a server with plugins', () => {
    const app = Fastify();
    const plugins = [fastifyApolloDrainPlugin(app)];
    const apollo = build(plugins);
    expect(apollo).not.toBeNull();
  });
});
