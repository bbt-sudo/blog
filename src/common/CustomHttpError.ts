import { MidwayHttpError, HttpStatus } from '@midwayjs/core';

export class CustomHttpError extends MidwayHttpError {
  constructor(message, code?: number) {
    if (!code) {
      code = HttpStatus.BAD_REQUEST;
    }
    super(message || '服务器出错啦！！！', code);
  }
}
