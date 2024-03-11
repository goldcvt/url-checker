import { IsString, ValidationError } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUrlDto {
  // TODO: maybe upgrade validation/transformation?
  @IsString()
  @Transform(({ value }) => {
    const baseUrl = new URL(value).origin;
    if (!baseUrl || baseUrl === 'null') {
      throw new ValidationError();
    }
    return baseUrl;
  })
  url: string;
}
