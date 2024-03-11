import { IStatusCodeCheckBody } from './status-code/status-code.check.interfaces.js';

export type ICheckData = {
  decodedJsonBody: Record<string, unknown> | undefined;
  statusCode: number | undefined;
};

export type ICheckResult = {
  statusCodeCheckResult: {
    hasRun: boolean;
    passed: boolean;
    resultBody: IStatusCodeCheckBody;
  };
};

export interface ICheck {
  check: (
    sourceData: ICheckData,
    currentResult: Partial<ICheckResult>,
    nextCheck?: ICheck,
    // each check should guarantee it's own result
    // this is not a perfect typing but hey it works for now
    // for now :)
  ) => ICheckResult;
}
