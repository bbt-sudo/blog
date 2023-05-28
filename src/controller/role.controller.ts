import { Inject } from '@midwayjs/core';
import { ESController } from '../components/es';
import { RoleService } from '../service/role.service';
import { BaseController } from './Base.controller';

@ESController({
  prefix: '/role',
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  service: RoleService,
})
export class RoleController extends BaseController {
  @Inject()
  service: RoleService;
}
