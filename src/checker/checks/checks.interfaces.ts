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
  hasBodyCheckResult: {
    hasRun: boolean;
    passed: boolean;
  };
};

// if we want immutable results
// we can use builder with chain of responsibility
// each check won't return anything, but will have a reference to the builder
// checks are chained, and each of them adds its own piece
// builder finalizes the result and guarantees that it's full
// with this each result from the checker will be immutable – no overwrites like with the middleware
export type ICheck =
  | ((
      sourceData: ICheckData,
      currentResult: ICheckResult,
      nextCheck?: ICheck,
      // this is not a perfect typing but hey it works for now
      // for now :)
    ) => ICheckResult)
  | (() => ICheckResult);
