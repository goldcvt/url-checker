import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from './app.config.js';
import { checkerConfig } from './checker/checker.config.js';
import { urlsDbConfig } from './urls/db/db.config.js';
import { urlsMigrations } from './urls/db/migrations/index.js';
import { UrlsModule } from './urls/urls.module.js';

@Module({
  imports: [
    UrlsModule,
    ConfigModule.forRoot({
      load: [checkerConfig, urlsDbConfig, appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: ConfigType<typeof urlsDbConfig>) => {
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          autoLoadEntities: true,
          migrations: [...urlsMigrations],
          migrationsRun: true,
          synchronize: false,
        };
      },
      inject: [urlsDbConfig.KEY],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
