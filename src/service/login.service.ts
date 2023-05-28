import { CaptchaService } from '@midwayjs/captcha';
import { Inject, Provide } from '@midwayjs/core';
import { LoginDao } from '../dao/Login.dao';
import { CustomHttpError } from '../common/CustomHttpError';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from '../entity/User.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class LoginService {
  @InjectEntityModel(UserEntity)
  entity: Repository<UserEntity>;

  @Inject()
  captcha: CaptchaService;

  @Inject()
  jwt: JwtService;

  async login(data: LoginDao) {
    // const passed = await this.checkCaptcha(data.captchaId, data.code);
    // if (!passed) {
    //   throw new CustomHttpError('验证码有误或已过期');
    // }

    const user = await this.entity.findOne({
      where: { username: data.username },
    });

    if (!user) {
      throw new CustomHttpError('用户名或密码有误');
    }

    if (user.password !== md5(data.password)) {
      throw new CustomHttpError('用户名或密码有误');
    }

    const { id, username, realname, nickname, roleId, avatar } = user;

    const userInfo = {
      id,
      username,
      realname,
      nickname,
      roleId,
      avatar,
    };

    const token = await this.jwt.sign(userInfo);

    return { token, userInfo };
  }

  async checkCaptcha(id, answer) {
    const passed: boolean = await this.captcha.check(id, answer);
    return passed;
  }

  async getCaptcha() {
    const { id: captchaId, imageBase64: image } = await this.captcha.image({
      width: 120,
      height: 40,
    });
    return {
      captchaId,
      image,
    };
  }
}
