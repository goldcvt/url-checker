import { Controller, Post, Body } from '@nestjs/common';

import { AddUrlUsecase } from './add-url.usecase.js';
import { CreateUrlDto } from './dto/add-url.dto.js';

@Controller('urls')
export class AddUrlController {
  constructor(private readonly usecase: AddUrlUsecase) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.usecase.execute(createUrlDto);
  }
}
