import Fastify from 'fastify';
import appService from '../app';

const fastify = Fastify();

beforeEach(() => {
  fastify.register(appService);
});

afterEach(async () => {
  await fastify.close();
});

/**
 * @group unit
 */
describe('GET /', () => {
  it('should return 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/version',
    });

    expect(response.statusCode).toEqual(200);
    const result = response.json();

    expect(result.version).toBeDefined();
    expect(result.version.length).toBeGreaterThan(0);
    expect(result.status).toBe('ok');
  });
});
