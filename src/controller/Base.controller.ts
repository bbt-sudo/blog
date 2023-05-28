import { Context, Inject, Provide } from '@midwayjs/core';
import { IResult, Result } from '../utils/Result';
@Provide()
export class BaseController {
  @Inject()
  ctx: Context;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }
  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }
}
