const assert = require('assert');
const app = require('../../src/app');

describe('\'foo\' service', () => {
  it('registered the service', () => {
    const service = app.service('foo');

    assert.ok(service, 'Registered the service');
  });
});
