import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { DeleteUrlUsecase } from './delete-url.usecase.js';

@ApiTags('urls')
@Controller('urls')
export class DeleteUrlController {
  constructor(private readonly usecase: DeleteUrlUsecase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The URL has been successfully deleted.',
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id') id: string) {
    await this.usecase.execute(+id);
  }
}
