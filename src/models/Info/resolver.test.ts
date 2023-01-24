/**
 * @group integration
 */
import { build } from '../../server/apollo/serverBuilder';
import gql from 'graphql-tag';

describe('Info Resolver', () => {
  it('should resolve correctly', async () => {
    const testServer = build();

    const response = await testServer.executeOperation({
      query: gql`
        query ServerInfo {
          serverInfo {
            id
            name
            status
          }
        }
      `,
    });
    expect(response?.body?.kind).toBe('single');
    expect(response.body['singleResult']).toBeDefined();
    expect(response.body['singleResult']['data']).toBeDefined();
    const serverInfo = response.body['singleResult']['data']['serverInfo'];
    expect(serverInfo).toBeDefined();
    expect(serverInfo['id']).toBe('1');
    expect(serverInfo['name']).toBeDefined();
    expect(serverInfo['name'].length).toBeGreaterThan(0);
    expect(serverInfo['status']).toBe('ok');
  });
});
