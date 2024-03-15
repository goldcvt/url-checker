import { ClassProvider, Module } from '@nestjs/common';

import { RESOLVE_SERVICE_TOKEN } from './resolve.constants.js';
import { ResolverService } from './resolve.service.js';

const resolverProvider: ClassProvider<ResolverService> = {
  provide: RESOLVE_SERVICE_TOKEN,
  useClass: ResolverService,
};

@Module({
  providers: [resolverProvider],
  exports: [RESOLVE_SERVICE_TOKEN],
})
export class ResolveModule {}
