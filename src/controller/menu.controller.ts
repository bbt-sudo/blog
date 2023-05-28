import { Inject, Post } from '@midwayjs/core';
import { ESController } from '../components/es';
import { MneuService } from '../service/menu.service';
import { BaseController } from './Base.controller';

@ESController({
  prefix: '/menu',
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  service: MneuService,
})
export class MenuController extends BaseController {
  @Inject()
  service: MneuService;

  @Post('/list/tree')
  async treeList() {
    const list = await this.service.treeList();
    return this.success(list);
  }
}
