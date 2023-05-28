import {
  Configuration,
  App,
  ILifeCycle,
  Inject,
  MidwayWebRouterService,
} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import * as orm from '@midwayjs/typeorm';
import { ExceptionFilter } from './filter/exception';
import * as captcha from '@midwayjs/captcha';
import * as cache from '@midwayjs/cache';
import { AuthorityMiddleware } from './middleware/authority.middleware';
import * as es from './components/es';
import * as upload from '@midwayjs/upload';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    captcha,
    cache,
    es,
    upload,
    swagger,
    jwt,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @Inject()
  webRouterService: MidwayWebRouterService;
  @App()
  app: koa.Application;
  @Inject()
  ctx: koa.Context;

  async onReady() {
    this.app.useFilter(ExceptionFilter);
    this.app.useMiddleware([AuthorityMiddleware]);
  }
}
