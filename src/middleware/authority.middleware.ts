import {
  App,
  IMiddleware,
  Inject,
  Middleware,
  NextFunction,
} from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context, Application } from '@midwayjs/koa';
import { CustomHttpError } from '../common/CustomHttpError';
import { CacheManager } from '@midwayjs/cache';
const adminUsers = ['admin', 'administrator', 'Administrator'];
const permss = ['/user/add', '/open/login'];
@Middleware()
export class AuthorityMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwt: JwtService;

  @App()
  app: Application;

  @Inject()
  cache: CacheManager;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx
        .get('Authorization')
        .slice(7, ctx.get('Authorization').length)
        .trimLeft();

      const { url } = ctx;
      if (permss.includes(url)) {
        return await next();
      }

      if (!token) {
        throw new CustomHttpError('token已过期或未授权');
      }

      try {
        const { secret } = this.app.getConfig('jwt');

        const user: any = await this.jwt.verify(token, secret);
        if (adminUsers.includes(user.username)) {
          return await next();
        }

        const perms: string[] = await this.cache.get(
          `es:admin:perms:${user.id}`
        );

        if (!perms && !perms.includes(url)) {
          throw new CustomHttpError('无权限访问', 1001);
        }

        ctx.admin = { user };

        await next();
      } catch (error) {
        throw new CustomHttpError(error.message, 401);
      }
    };
  }
}
