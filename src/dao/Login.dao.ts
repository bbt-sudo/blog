import { Rule, RuleType } from '@midwayjs/validate';

export class LoginDao {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;

  // @Rule(RuleType.string().required())
  // captchaId: string;

  // @Rule(RuleType.number().required())
  // code: number;
}
