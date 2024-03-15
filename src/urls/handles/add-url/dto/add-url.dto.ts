import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, ValidationError } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    description:
      "The URL to be checked. It will be truncated to it's base URL.",
    type: String,
    minLength: 5,
    examples: [
      'https://x.com/posts/some/',
      'x.com',
      'https://x.com',
      'http://mysite.com:80',
    ],
  })
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
