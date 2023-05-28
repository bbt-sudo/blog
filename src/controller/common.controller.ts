import {
  Body,
  Controller,
  Del,
  Files,
  Get,
  Inject,
  Post,
} from '@midwayjs/core';
import { BaseController } from './Base.controller';
import { FileService } from '../service/file.service';

@Controller('/common')
export class CommonController extends BaseController {
  @Inject()
  file: FileService;

  @Post('/upload')
  async upload(@Files() files) {
    return this.success(await this.file.upload(files));
  }

  @Del('/removeFile')
  async removeFile(@Body() data) {
    if (!data.url) return this.error('文件地址不可为空');
    return this.success(await this.file.removeFile(data.url));
  }

  @Post('/import')
  async import(@Files() files) {
    const file = files[0];
    const data = await this.file.importExcel(file);
    // 将数据保存到数据库或者其它地方
    return this.success(data);
  }

  @Get('/export')
  async export() {
    // 数据可以来自数据库或其它地方
    const data = [
      ['id', 'name'],
      [1, '张三'],
      [2, '李四'],
    ];
    await this.file.exportExcel(data);
  }
}
