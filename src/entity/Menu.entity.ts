import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Base.entity';

@Entity('menu')
export class MneuEntity extends BaseEntity {
  @Column({ comment: '父菜单ID', type: 'int', nullable: true })
  parentId: number;
  @Column({ comment: '菜单名称' })
  name: string;
  @Column({ comment: '类型 0:目录 1:菜单 2:接口', default: 0, type: 'tinyint' })
  type: number;
  @Column({ comment: '排序', default: 0 })
  orderNum: number;

  // 目录和菜单
  @Column({ comment: '图标', nullable: true })
  icon: string;

  // 菜单独有
  @Column({ comment: '菜单地址', nullable: true })
  router: string;
  @Column({ comment: '视图地址', nullable: true })
  viewPath: string;

  // 接口权限独有
  @Column({ comment: '权限标识', nullable: true })
  perms: string;
}
