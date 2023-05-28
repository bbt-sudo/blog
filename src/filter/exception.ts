import { Catch, Context } from '@midwayjs/core';
import { Result } from '../utils/Result';

@Catch()
export class ExceptionFilter {
  async catch(err, ctx: Context) {
    ctx.logger.error(err);
    return Result.error({
      code: err.status ?? 500,
      message: err.message,
    });
  }
}
