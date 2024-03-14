import { UrlDomainModel } from '../../urls/urls.domain.js';
import { ICheckData } from '../checks/checks.interfaces.js';

export type IHttpResultData = ICheckData;

export interface IHttpService {
  getData: (dest: UrlDomainModel) => Promise<IHttpResultData>;
}
