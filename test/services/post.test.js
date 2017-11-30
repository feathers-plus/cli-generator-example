const assert = require('assert');
const app = require('../../src/app');

describe('\'post\' service', () => {
  it('registered the service', () => {
    const service = app.service('post');

    assert.ok(service, 'Registered the service');
  });
});
