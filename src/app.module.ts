import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module.js';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { checkerConfig } from './checker/checker.config.js';
import { urlsDbConfig } from './urls/urls.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UrlsModule,
    ConfigModule.forRoot({
      load: [checkerConfig, urlsDbConfig],
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
          synchronize: false,
        };
      },
      inject: [urlsDbConfig.KEY],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
