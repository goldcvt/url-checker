import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { APP_CONFIG_NAMESPACE } from './app.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const HTTP_PORT = configService.getOrThrow<number>(
    `${APP_CONFIG_NAMESPACE}.http.port`,
  );
  await app.listen(HTTP_PORT);
}
bootstrap();
