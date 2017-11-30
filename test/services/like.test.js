const assert = require('assert');
const app = require('../../src/app');

describe('\'like\' service', () => {
  it('registered the service', () => {
    const service = app.service('like');

    assert.ok(service, 'Registered the service');
  });
});
