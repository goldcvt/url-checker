import { ClassProvider, Module } from '@nestjs/common';
import { ResolverService } from './resolve.service.js';
import { RESOLVE_SERVICE_TOKEN } from './resolve.constants.js';

const resolverProvider: ClassProvider<ResolverService> = {
  provide: RESOLVE_SERVICE_TOKEN,
  useClass: ResolverService,
};

@Module({
  providers: [resolverProvider],
  exports: [RESOLVE_SERVICE_TOKEN],
})
export class ResolveModule {}
