import { UrlDomainModel } from '../../urls/urls.domain.js';
import { ICheckData } from '../checks/checks.interfaces.js';

export type ISourceFinalResult = ICheckData;

export const StatusCodeCheckFailureReasons = {
  connRefused: 'ECONNREFUSED',
  unknown: 'unknown',
} as const;

// Could do the same chain of responsibility pattern here
export interface ISourceService {
  extractData: (dest: UrlDomainModel) => Promise<ISourceFinalResult>;
}
