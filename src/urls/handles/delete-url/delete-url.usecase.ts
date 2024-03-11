import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from '../../entities/url.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUrlUsecase {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  async execute(id: number) {
    return await this.urlRepo.delete(id);
  }
}
