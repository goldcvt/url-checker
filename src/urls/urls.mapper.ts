import { RawUrl } from './db/entities/url.entity.js';
import { UrlPlain } from './urls.interfaces.js';

export class UrlMapper {
  static rawToPlain(raw: RawUrl): UrlPlain {
    return {
      id: raw.id,
      url: raw.url,
      lastCheckedAt: raw.last_checked_at,
      lastResolvedIp: raw.last_resolved_ip,
      lastCheckStatus: raw.last_check_status,
    };
  }
}
