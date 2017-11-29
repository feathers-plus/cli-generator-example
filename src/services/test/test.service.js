// Initializes the `test` service on path `/mymemory`
const createService = require('feathers-memory');
const hooks = require('./test.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'test',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mymemory', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mymemory');

  service.hooks(hooks);
};
