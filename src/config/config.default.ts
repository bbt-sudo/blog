import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1685113477977_9413',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '154.12.35.131',
        port: 3306,
        username: 'blog',
        password: 'G4F4Y7p8WDJidmxe',
        database: 'blog',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        // 配置实体模型-扫描实体
        entities: ['**/entity/*.ts'],
        dateStrings: true,
      },
    },
  },
  jwt: {
    secret: 'textwww.top',
    expiresIn: '2h',
  },

  cache: {
    // store: 'memory',
    // options: {
    //   ttl: null // 过期时间单位毫秒，设置为null视为不过期，默认10000ms
    // }

    // 使用 redis 缓存
    store: redisStore,
    options: {
      host: '154.12.35.131', // default value
      port: 6379, // default value
      password: '123456',
      db: 0,
      keyPrefix: 'cache:',
      ttl: null,
    },
  },
} as MidwayConfig;
