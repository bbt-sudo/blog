import {
  Controller,
  RouterOption,
  Scope,
  ScopeEnum,
  saveClassMetadata,
  saveModule,
} from '@midwayjs/core';

export const MODEL_KEY = 'decorator:es-controller';
export declare type ApiTypes =
  | 'add'
  | 'delete'
  | 'update'
  | 'page'
  | 'info'
  | 'list';

export interface CurdOption {
  prefix?: string;
  api: ApiTypes[];
  entity?: any;
  service?: any;
}

export function ESController(
  curdOption?: CurdOption | string,
  routerOptions?: RouterOption
): ClassDecorator {
  return target => {
    saveModule(MODEL_KEY, target);
    curdOption = curdOption || '';
    const options =
      typeof curdOption === 'string' ? { prefix: curdOption } : curdOption;

    saveClassMetadata(MODEL_KEY, { options }, target);

    Scope(ScopeEnum.Request)(target);

    if (!curdOption) {
      Controller()(target);
    } else {
      Controller(options.prefix, routerOptions)(target);
    }
  };
}
