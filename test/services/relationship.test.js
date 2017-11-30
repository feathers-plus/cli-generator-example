const assert = require('assert');
const app = require('../../src/app');

describe('\'relationship\' service', () => {
  it('registered the service', () => {
    const service = app.service('relationship');

    assert.ok(service, 'Registered the service');
  });
});
