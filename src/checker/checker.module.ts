import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { checkerConfig } from './checker.config.js';
import { ConfigType } from '@nestjs/config';
import { CheckerService } from './checker.service.js';
import { HttpGetCheckerSourceService } from './http/http.service.js';
import { HTTP_SERVICE_TOKEN } from './checker.constants.js';
import { ChecksPipeline } from './checks/checks.pipeline.js';
import { Agent } from 'https';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigType<typeof checkerConfig>) => ({
        timeout: config.timeout,
        maxRedirects: config.maxRedirects,
        // We will handle retries on non-2xx codes ourselves
        validateStatus: () => true,
        // security moment :)
        // It's just that otherwise SSL certs won't work with IP addresses (they're probalby issued for FQDNs)
        // this is fine if we control the servers
        // and just sanitize the returned data and that's it, we're good even with this option
        httpsAgent: new Agent({
          rejectUnauthorized: config.rejectUnauthorizedCerts,
        }),
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
