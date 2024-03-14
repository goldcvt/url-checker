import { ICheck, ICheckData, ICheckResult } from '../checks.interfaces.js';

export const hasBodyCheck: ICheck = (
  sourceData: ICheckData,
  currentResult: ICheckResult,
  nextCheck?: ICheck,
) => {
  const passed = Boolean(
    sourceData.decodedJsonBody &&
      Object.keys(sourceData.decodedJsonBody).length > 0,
  );
  currentResult.hasBodyCheckResult = {
    hasRun: true,
    passed,
  };

  if (nextCheck) {
    return nextCheck(sourceData, currentResult);
  }

  return currentResult;
};
