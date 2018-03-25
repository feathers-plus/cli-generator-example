/// <reference types="mocha"/>
import assert from 'assert';
import app from '../../src/app';

describe('\'likes\' service', () => {
  it('registered the service', () => {
    const service = app.service('likes');

    assert.ok(service, 'Registered the service');
  });
});
