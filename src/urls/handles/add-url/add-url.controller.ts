import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AddUrlUsecase } from './add-url.usecase.js';
import { CreateUrlDto } from './dto/add-url.dto.js';
import { AddUrlResponse } from './dto/add-url.response.js';

@ApiTags('urls')
@Controller('urls')
export class AddUrlController {
  constructor(private readonly usecase: AddUrlUsecase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description:
      'The URL has been successfully created and will be checked soon.',
    type: AddUrlResponse,
  })
  async create(@Body() createUrlDto: CreateUrlDto) {
    const res = await this.usecase.execute(createUrlDto);
    return res satisfies AddUrlResponse;
  }
}
