import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from '../../db/entities/url.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUrlUsecase {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  async execute(id: number) {
    await this.urlRepo.delete(id);
  }
}
