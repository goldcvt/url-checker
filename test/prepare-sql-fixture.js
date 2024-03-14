import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const makeRandomString = () => randomUUID();

const main = () => {
  const urlCount = 2_000;
  const data = new Array(urlCount)
    .fill(urlCount)
    .map((_) => makeRandomString())
    .reduce((prev, curr) => prev + "('" + curr + "')" + '\n, ', '');
  writeFileSync(
    './fixture.sql',
    `INSERT INTO test (url) VALUES ${data.slice(0, -2)};`,
  );
};

main();
