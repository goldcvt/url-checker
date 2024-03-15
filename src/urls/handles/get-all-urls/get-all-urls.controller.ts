import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GetAllUrlResponse } from './dto/get-all-url.response.js';
import { GetAllUrlsUsecase } from './get-all-urls.usecase.js';

@ApiTags('urls')
@Controller('urls')
export class GetAllUrlsController {
  constructor(private readonly usecase: GetAllUrlsUsecase) {}

  @ApiOkResponse({ type: GetAllUrlResponse, isArray: true })
  @Get()
  async findAll(@Res() nestRes: Response) {
    const urls = await this.usecase.execute();

    // super basic caching since we'll refresh the
    // data every 2 minutes
    // it's not ideal, it's far from ideal, but it'll do
    nestRes.set('Cache-Control', 'public, max-age=120');
    return nestRes.json(urls satisfies GetAllUrlResponse[]);
  }
}
