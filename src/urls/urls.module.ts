import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlEntity } from './db/entities/url.entity.js';
import { AddUrlController } from './handles/add-url/add-url.controller.js';
import { AddUrlUsecase } from './handles/add-url/add-url.usecase.js';
import { CheckAllUrlsUsecase } from './handles/check-all-urls/check-all-urls.usecase.js';
import { DeleteUrlController } from './handles/delete-url/delete-url.controller.js';
import { DeleteUrlUsecase } from './handles/delete-url/delete-url.usecase.js';
import { GetAllUrlsController } from './handles/get-all-urls/get-all-urls.controller.js';
import { GetAllUrlsUsecase } from './handles/get-all-urls/get-all-urls.usecase.js';
import { UrlsDomainFactory } from './urls.factory.js';
import { UrlsRepository } from './urls.repository.js';
import { UrlsService } from './urls.service.js';
import { CheckerModule } from '../checker/checker.module.js';
import { ResolveModule } from '../resolve/resolve.module.js';

const usecaseProviders = [
  AddUrlUsecase,
  GetAllUrlsUsecase,
  DeleteUrlUsecase,
  CheckAllUrlsUsecase,
];

@Module({
  imports: [
    CheckerModule,
    ResolveModule,
    TypeOrmModule.forFeature([UrlEntity]),
  ],
  controllers: [AddUrlController, GetAllUrlsController, DeleteUrlController],
  providers: [
    UrlsService,
    UrlsDomainFactory,
    UrlsRepository,
    ...usecaseProviders,
  ],
})
export class UrlsModule {}
