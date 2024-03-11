import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from '../../entities/url.entity.js';
import { Repository } from 'typeorm';
import { UrlMapper } from '../../urls.mapper.js';

@Injectable()
export class GetAllUrlsUsecase {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  async execute() {
    const rawResults = await this.urlRepo
      .createQueryBuilder()
      .select('*')
      .getRawMany();
    return rawResults.map((raw) => UrlMapper.rawToPlain(raw));
  }
}
