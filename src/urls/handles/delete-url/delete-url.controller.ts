import { Controller, Param, Delete, HttpCode } from '@nestjs/common';

import { DeleteUrlUsecase } from './delete-url.usecase.js';

@Controller('urls')
export class DeleteUrlController {
  constructor(private readonly usecase: DeleteUrlUsecase) {}

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usecase.execute(+id);
  }
}
