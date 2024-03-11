import { Controller, Param, Delete } from '@nestjs/common';

import { DeleteUrlUsecase } from './delete-url.usecase.js';

@Controller('urls')
export class DeleteUrlController {
  constructor(private readonly usecase: DeleteUrlUsecase) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usecase.execute(+id);
  }
}
