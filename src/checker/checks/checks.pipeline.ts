import { ICheck, ICheckData, ICheckResult } from './checks.interfaces.js';
import { createEmptyResultObject } from './checks.utils.js';

export class ChecksPipeline {
  private checks: ICheck[] = [];

  private invokeChecks(
    sourceData: ICheckData,
    checks: ICheck[],
    resultAtThisStep?: ICheckResult,
  ): ICheckResult {
    // this one works
    const currentResult = resultAtThisStep ?? createEmptyResultObject();
    if (!checks.length) {
      return currentResult;
    }

    const firstCheck = checks[0];

    return firstCheck(sourceData, currentResult, (): ICheckResult => {
      // okay this is an understandable bug
      // every check does destructuring, so it's a new object
      // but we pass arround the same exact one :)
      return this.invokeChecks(sourceData, checks.slice(1), currentResult);
    });
  }

  apply(...checks: ICheck[]) {
    this.checks.push(...checks);
  }

  run(sourceData: ICheckData): ICheckResult {
    return this.invokeChecks(sourceData, [...this.checks]);
  }
}
