import * as dotenv from 'dotenv';
import type { z } from 'zod';
import { toCamelCaseKey } from '../../shared/utils/stringUtils';
import { globalEnvironmentSchema } from './globalEnvironmentSchema';

export type Environment = z.infer<typeof globalEnvironmentSchema>;

const loadEnvironment = () => {
  dotenv.config();

  // convert environment keys to camel case for better developer experience
  const env = toCamelCaseKey(process.env);
  return globalEnvironmentSchema.parse(env);
};

export class EnvironmentFactory {
  private static _env: Environment | null = null;

  static create(reload = false): Environment {
    if (!this._env || reload) {
      this._env = loadEnvironment();
    }
    return this._env;
  }
}
