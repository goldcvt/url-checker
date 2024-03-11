import { ICheck, ICheckData, ICheckResult } from '../checks.interfaces.js';

export const statusCodeCheck = {
  check: (
    sourceData: ICheckData,
    currentResult: Partial<ICheckResult>,
    nextCheck?: ICheck,
  ): ICheckResult => {
    const { statusCode } = sourceData;
    const hasRun = Boolean(statusCode);
    const passed =
      hasRun && statusCode ? statusCode >= 200 && statusCode < 300 : false;

    const resultAtThisStep = Object.assign({}, currentResult, {
      statusCodeCheckResult: {
        hasRun,
        passed,
        resultBody:
          passed && statusCode
            ? {
                statusCode: statusCode,
              }
            : {},
      },
    });

    if (nextCheck) {
      return nextCheck.check(sourceData, resultAtThisStep);
    }

    return resultAtThisStep;
  },
} satisfies ICheck;
