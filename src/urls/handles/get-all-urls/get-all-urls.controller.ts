import { Controller, Get } from '@nestjs/common';

import { GetAllUrlsUsecase } from './get-all-urls.usecase.js';
import { GetAllUrlResponse } from './dto/get-all-url.response.js';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('urls')
@Controller('urls')
export class GetAllUrlsController {
  constructor(private readonly usecase: GetAllUrlsUsecase) {}

  @ApiOkResponse({ type: GetAllUrlResponse, isArray: true })
  @Get()
  async findAll() {
    const res = await this.usecase.execute();
    return res satisfies GetAllUrlResponse[];
  }
}
