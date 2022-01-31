import {sleep} from '../utils';

describe('Utils.ts', () => {
  test('sleep', async () => {
    const delay = 100;
    const start = Date.now();
    await sleep(delay);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(delay);
  });
});
