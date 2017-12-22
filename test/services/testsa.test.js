const assert = require('assert');
const app = require('../../src/app');

describe('\'testsa\' service', () => {
  it('registered the service', () => {
    const service = app.service('testsa');

    assert.ok(service, 'Registered the service');
  });
});
