import { ICheckResult } from './checks.interfaces.js';

export const createEmptyResultObject = (): ICheckResult => {
  return {
    statusCodeCheckResult: {
      hasRun: false,
      passed: false,
      resultBody: {},
    },
    hasBodyCheckResult: {
      hasRun: false,
      passed: false,
    },
  };
};
