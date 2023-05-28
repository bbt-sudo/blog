import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { BaseController } from './Base.controller';
import { LoginService } from '../service/login.service';
import { LoginDao } from '../dao/Login.dao';

@Controller('/open')
export class OpenCOntroller extends BaseController {
  @Inject()
  service: LoginService;

  @Post('/login')
  async login(@Body() data: LoginDao) {
    const res = await this.service.login(data);
    return this.success(res);
  }

  @Post('/imgcaptcha')
  async imgcaptcha() {
    const res = await this.service.getCaptcha();
    return this.success(res);
  }
}
