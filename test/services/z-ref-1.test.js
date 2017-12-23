const assert = require('assert');
const app = require('../../src/app');

describe('\'zRef1\' service', () => {
  it('registered the service', () => {
    const service = app.service('z-ref-1');

    assert.ok(service, 'Registered the service');
  });
});
