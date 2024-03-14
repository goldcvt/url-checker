import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { checkerConfig } from './checker.config.js';
import { ConfigType } from '@nestjs/config';
import { CheckerService } from './checker.service.js';
import { HttpGetCheckerSourceService } from './http/http.service.js';
import { HTTP_SERVICE_TOKEN } from './checker.constants.js';
import { ChecksPipeline } from './checks/checks.pipeline.js';

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
      provide: HTTP_SERVICE_TOKEN,
      useClass: HttpGetCheckerSourceService,
    },
    CheckerService,
    ChecksPipeline,
  ],
  exports: [CheckerService],
})
export class CheckerModule {}
