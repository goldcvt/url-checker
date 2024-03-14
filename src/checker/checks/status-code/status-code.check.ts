import { ICheck, ICheckData, ICheckResult } from '../checks.interfaces.js';

export const statusCodeCheck: ICheck = (
  sourceData: ICheckData,
  currentResult: ICheckResult,
  nextCheck?: ICheck,
): ICheckResult => {
  const { statusCode } = sourceData;
  const passed = statusCode ? statusCode >= 200 && statusCode < 300 : false;

  currentResult.statusCodeCheckResult = {
    hasRun: true,
    passed,
    resultBody: statusCode
      ? {
          statusCode: statusCode,
        }
      : {},
  };

  if (nextCheck) {
    return nextCheck(sourceData, currentResult);
  }

  return currentResult;
};
