const assert = require('assert');
const app = require('../../src/app');

describe('\'test\' service', () => {
  it('registered the service', () => {
    const service = app.service('mymemory');

    assert.ok(service, 'Registered the service');
  });
});
