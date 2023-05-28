import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from './Base.service';
import { UserEntity } from '../entity/User.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Repository } from 'typeorm';
import * as md5 from 'md5';
import { CustomHttpError } from '../common/CustomHttpError';
import { Context } from '@midwayjs/koa';
import { RoleService } from './role.service';
import { MneuService } from './menu.service';
import { CacheManager } from '@midwayjs/cache';

@Provide()
export class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  entity: Repository<UserEntity>;

  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

  @Inject()
  menuService: MneuService;

  @Inject()
  cache: CacheManager;

  async info(data) {
    const user = await super.info(data);
    return user;
  }

  async add(data: UserEntity) {
    const user = await this.entity.findOne({
      where: { username: data.username },
    });
    if (user) {
      throw new CustomHttpError('用户已存在');
    }
    if (data.password) {
      data.password = md5(data.password);
    }
    return await super.add(data);
  }

  async update(data: UserEntity) {
    if (data.password) {
      data.password = md5(data.password);
    }
    return await super.update(data);
  }

  async getUserRole() {
    const userId = this.ctx.admin.user.id;

    const res = await super.info({ id: userId });

    const roles = res.roleId?.split(',') || [];

    const roleList = await this.roleService.list({ id: In(roles) });

    const menIds = [];
    roleList.forEach(role => {
      menIds.push(...(role.menuId?.split(',') || []));
    });

    const menuList = await this.menuService.list({ id: In(menIds) });
    const menus = this.menuService.list2tree(
      menuList.filter(item => item.type !== 2)
    );
    const perms = menuList
      .filter(item => item.type === 2)
      .map(item => item.perms);
    await this.cache.set(`es:admin:perms:${userId}`, JSON.stringify(perms));

    return { ...res, roleList, menus, perms };
  }
}
