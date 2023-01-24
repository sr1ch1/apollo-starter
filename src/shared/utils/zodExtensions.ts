import { z } from 'zod';
import ms, { StringValue } from 'ms';

export class zx {
  static ms = () =>
    z
      .string()
      .default('1m')
      .refine(
        (val) => {
          return ms(val as StringValue) != undefined;
        },
        {
          message: 'String is not in ms format',
        },
      );
}
