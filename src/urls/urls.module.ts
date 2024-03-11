import { Module } from '@nestjs/common';

import { UrlsService } from './urls.service.js';
import { AddUrlController } from './handles/add-url/add-url.controller.js';
import { GetAllUrlsController } from './handles/get-all-urls/get-all-urls.controller.js';
import { DeleteUrlController } from './handles/delete-url/delete-url.controller.js';
import { AddUrlUsecase } from './handles/add-url/add-url.usecase.js';
import { GetAllUrlsUsecase } from './handles/get-all-urls/get-all-urls.usecase.js';
import { DeleteUrlUsecase } from './handles/delete-url/delete-url.usecase.js';
import { UrlsDomainFactory } from './urls.factory.js';
import { CheckerModule } from 'src/checker/checker.module.js';
import { ResolveModule } from 'src/resolve/resolve.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity.js';

const usecaseProviders = [AddUrlUsecase, GetAllUrlsUsecase, DeleteUrlUsecase];

@Module({
  imports: [
    CheckerModule,
    ResolveModule,
    TypeOrmModule.forFeature([UrlEntity]),
  ],
  controllers: [AddUrlController, GetAllUrlsController, DeleteUrlController],
  providers: [UrlsService, UrlsDomainFactory, ...usecaseProviders],
})
export class UrlsModule {}
