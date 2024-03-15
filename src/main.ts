import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { APP_CONFIG_NAMESPACE } from './app.config.js';
import { AppModule } from './app.module.js';
import { useSwagger } from './app.utils.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const HTTP_PORT = configService.getOrThrow<number>(
    `${APP_CONFIG_NAMESPACE}.http.port`,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  useSwagger(app);
  await app.listen(HTTP_PORT);
}
bootstrap();
