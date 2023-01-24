/**
 * @group unit
 */
import { asFloat, asInteger, toCamelCase, toCamelCaseKey } from './stringUtils';
import { describe } from '@jest/globals';

describe('toCamelCase', () => {
  it('should transform properly', async () => {
    expect(toCamelCase('test_case')).toBe('testCase');
    expect(toCamelCase('_test_case')).toBe('TestCase');
  });

  it('should not remove trailing _', async () => {
    expect(toCamelCase('test_case_')).toBe('testCase_');
  });

  it('should not break on empty string', async () => {
    expect(toCamelCase('')).toBe('');
  });
});

describe('toCamelCaseKey', function () {
  it('should transform keys properly', () => {
    const sut = {
      FIRST_CASE: 'value',
      SECOND_CASE: 'another value',
    };
    const expectedValue = {
      firstCase: 'value',
      secondCase: 'another value',
    };

    expect(toCamelCaseKey(sut)).toEqual(expectedValue);
  });

  it('should not break on empty object', () => {
    const sut = {};
    expect(toCamelCaseKey(sut)).toEqual({});
  });
});

describe('asInteger', () => {
  it('should convert a string to an integer', () => {
    expect(asInteger('123')).toBe(123);
  });

  it('should not break on undefined', () => {
    expect(asInteger(undefined)).toBeUndefined();
  });

  it('should return NaN on invalid input', () => {
    expect(asInteger('test')).toBeUndefined();
  });
});

describe('asFloat', () => {
  it('should convert a string to a float', () => {
    expect(asFloat('1.23')).toBeCloseTo(1.23);
  });

  it('should not break on undefined', () => {
    expect(asFloat(undefined)).toBeUndefined();
  });

  it('should return NaN on invalid input', () => {
    expect(asFloat('test')).toBeUndefined();
  });
});
