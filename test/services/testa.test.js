const assert = require('assert');
const app = require('../../src/app');

describe('\'testa\' service', () => {
  it('registered the service', () => {
    const service = app.service('testa');

    assert.ok(service, 'Registered the service');
  });
});
