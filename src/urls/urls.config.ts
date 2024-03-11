import { registerAs } from '@nestjs/config';

export const urlsDbConfig = registerAs(
  'urls-database-config',
  () =>
    ({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'postgres',
    }) as const,
);
