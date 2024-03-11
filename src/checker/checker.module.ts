import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { checkerConfig } from './checker.config.js';
import { ConfigType } from '@nestjs/config';
import { CheckerService } from './checker.service.js';
import { HttpGetCheckerSourceService } from './sources/sources.http-get.js';
import { CHECKER_SERVICE_SOURCE_PROVIDER } from './checker.constants.js';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigType<typeof checkerConfig>) => ({
        timeout: config.timeout,
        maxRedirects: config.maxRedirects,
        // We will handle retries on non-2xx codes ourselves
        validateStatus: () => true,
      }),
      inject: [checkerConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: CHECKER_SERVICE_SOURCE_PROVIDER,
      useClass: HttpGetCheckerSourceService,
    },
    CheckerService,
  ],
  exports: [CheckerService],
})
export class CheckerModule {}
