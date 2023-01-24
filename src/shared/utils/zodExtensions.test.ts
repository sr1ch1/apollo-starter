/**
 * @group unit
 */
import { zx } from './zodExtensions';

describe('zx.ms', () => {
  it('should validate successfully', () => {
    const msType = zx.ms();

    const value = msType.parse('1 day');

    expect(value).toBe('1 day');
  });

  it('should not validate on wrong input', () => {
    const msType = zx.ms();
    expect(() => msType.parse('1 gram')).toThrow();
  });
});
