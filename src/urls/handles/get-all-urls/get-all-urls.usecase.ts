import { Injectable } from '@nestjs/common';
import { UrlMapper } from '../../urls.mapper.js';
import { UrlsRepository } from '../../urls.repository.js';

@Injectable()
export class GetAllUrlsUsecase {
  constructor(private readonly urlRepo: UrlsRepository) {}

  async execute() {
    const rawResults = await this.urlRepo.getAll();
    return rawResults.map((raw) => UrlMapper.rawToPlain(raw));
  }
}
