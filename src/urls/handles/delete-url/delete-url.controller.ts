import {
  Controller,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { DeleteUrlUsecase } from './delete-url.usecase.js';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

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
