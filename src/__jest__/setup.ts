// no type definitions available for expose-gc. Hence require
const garbageCollector = require('expose-gc/function');
afterEach(() => {
  expect.hasAssertions();
});
afterAll(() => {
  try {
    garbageCollector();
  } catch {}
});
