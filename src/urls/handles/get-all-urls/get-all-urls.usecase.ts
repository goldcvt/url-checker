import { Injectable } from '@nestjs/common';
import { UrlsRepository } from '../../urls.repository.js';

@Injectable()
export class GetAllUrlsUsecase {
  constructor(private readonly urlRepo: UrlsRepository) {}

  async execute() {
    return this.urlRepo.getAll();
  }
}
