const assert = require('assert');
const app = require('../../src/app');

describe('\'zmongoosea\' service', () => {
  it('registered the service', () => {
    const service = app.service('zmongoosea');

    assert.ok(service, 'Registered the service');
  });
});
