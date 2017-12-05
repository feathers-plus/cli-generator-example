const assert = require('assert');
const app = require('../../src/app');

describe('\'testschema\' service', () => {
  it('registered the service', () => {
    const service = app.service('testschema');

    assert.ok(service, 'Registered the service');
  });
});
