/// <reference types="mocha"/>
import assert from 'assert';
import app from '../../src/app';

describe('\'relationships\' service', () => {
  it('registered the service', () => {
    const service = app.service('relationships');

    assert.ok(service, 'Registered the service');
  });
});
