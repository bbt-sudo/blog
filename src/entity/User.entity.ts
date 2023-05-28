import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ comment: '用户名', nullable: false })
  username: string;

  @Column({ comment: '密码(md5加密)', nullable: false })
  password: string;

  @Column({ comment: '昵称', nullable: false })
  nickname: string;

  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @Column({ comment: '真人姓名', nullable: true })
  realname: string;

  @Column({ comment: '角色Id(1,2,3)', nullable: true })
  roleId: string;
}
