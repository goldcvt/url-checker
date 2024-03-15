import assert from 'node:assert';

import { ICheckData } from './checks.interfaces.js';
import { ChecksPipeline } from './checks.pipeline.js';
import { hasBodyCheck } from './has-body/has-body.check.js';
import { statusCodeCheck } from './status-code/status-code.check.js';

// order of checks shouldn't matter
describe('ChecksPipeline', () => {
  it('Can run a statusCode check in pipeline', () => {
    // Arrange
    const sourceData: ICheckData = {
      decodedJsonBody: {},
      statusCode: 200,
    };
    const checksPipeline = new ChecksPipeline();
    checksPipeline.apply(statusCodeCheck);

    // Act
    const res = checksPipeline.run(sourceData);

    // Assert
    assert.deepStrictEqual(res, {
      statusCodeCheckResult: {
        hasRun: true,
        passed: true,
        resultBody: {
          statusCode: 200,
        },
      },
      hasBodyCheckResult: {
        hasRun: false,
        passed: false,
      },
    });
  });
  it('Can run a hasBody check in pipeline', () => {
    // Arrange
    const sourceData: ICheckData = {
      decodedJsonBody: {},
      statusCode: 200,
    };
    const checksPipeline = new ChecksPipeline();
    checksPipeline.apply(statusCodeCheck);

    // Act
    const res = checksPipeline.run(sourceData);

    // Assert
    assert.deepStrictEqual(res, {
      statusCodeCheckResult: {
        hasRun: true,
        passed: true,
        resultBody: {
          statusCode: 200,
        },
      },
      hasBodyCheckResult: {
        hasRun: false,
        passed: false,
      },
    });
  });
  it('Can run both checks in pipeline, order should not matter', () => {
    // Arrange
    const sourceData: ICheckData = {
      decodedJsonBody: {},
      statusCode: 200,
    };
    const expectedResult = {
      statusCodeCheckResult: {
        hasRun: true,
        passed: true,
        resultBody: {
          statusCode: 200,
        },
      },
      hasBodyCheckResult: {
        hasRun: true,
        passed: false,
      },
    };

    const checksPipeline = new ChecksPipeline();
    checksPipeline.apply(statusCodeCheck, hasBodyCheck);

    const res = checksPipeline.run(sourceData);

    assert.deepStrictEqual(res, expectedResult);

    const checksPipeline2 = new ChecksPipeline();
    checksPipeline2.apply(hasBodyCheck, statusCodeCheck);

    const resOfPipeline2 = checksPipeline2.run(sourceData);

    assert.deepStrictEqual(resOfPipeline2, expectedResult);
  });
});
