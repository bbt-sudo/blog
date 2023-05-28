import { Inject, Post } from '@midwayjs/core';
import { BaseController } from './Base.controller';
import { UserService } from '../service/user.service';
import { ESController } from '../components/es';

@ESController({
  prefix: '/user',
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  service: UserService,
})
export class UserController extends BaseController {
  @Inject()
  service: UserService;

  @Post('/getUserRole')
  async getUserRole() {
    return this.success(await this.service.getUserRole());
  }
}
