import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Base.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;
  @Column({ comment: '名称: 1,2,3', nullable: true })
  menuId: string;
  @Column({ comment: '备注', nullable: true })
  remark: string;
}
