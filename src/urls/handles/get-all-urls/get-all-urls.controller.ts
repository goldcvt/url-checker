import { Controller, Get } from '@nestjs/common';

import { GetAllUrlsUsecase } from './get-all-urls.usecase.js';

@Controller('urls')
export class GetAllUrlsController {
  constructor(private readonly usecase: GetAllUrlsUsecase) {}

  @Get()
  findAll() {
    return this.usecase.execute();
  }
}
