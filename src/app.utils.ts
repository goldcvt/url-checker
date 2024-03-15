import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('URL Checker')
    .setDescription('The URL Checker API')
    .setVersion('0.1')
    .addTag('url')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
