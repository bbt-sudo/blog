import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from './Base.service';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { MneuEntity } from '../entity/Menu.entity';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/koa';

@Provide()
export class MneuService extends BaseService<MneuEntity> {
  @InjectEntityModel(MneuEntity)
  entity: Repository<MneuEntity>;

  @Inject()
  ctx: Context;

  async treeList(where = {}) {
    const list = await this.entity.find({ order: { parentId: 'ASC' } });
    return this.list2tree(list);
  }

  list2tree(list, parent = null) {
    const tree: any = [];
    let temp;
    for (let i = 0; i < list.length; i++) {
      if (list[i].parentId === parent) {
        const obj = list[i];
        obj.label = list[i].name;
        obj.value = list[i].id;
        const newList = list.filter(item => item.parentId !== parent);
        temp = this.list2tree(newList, list[i].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        tree.push(obj);
      }
    }
    return tree;
  }
}
