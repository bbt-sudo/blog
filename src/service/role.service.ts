import { Provide } from '@midwayjs/core';
import { BaseService } from './Base.service';
import { RoleEntity } from '../entity/Role.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class RoleService extends BaseService<RoleEntity> {
  @InjectEntityModel(RoleEntity)
  entity: Repository<RoleEntity>;
}
