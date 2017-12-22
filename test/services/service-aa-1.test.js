const assert = require('assert');
const app = require('../../src/app');

describe('\'serviceAa1\' service', () => {
  it('registered the service', () => {
    const service = app.service('service--aa--1');

    assert.ok(service, 'Registered the service');
  });
});
