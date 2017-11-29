// Initializes the `user` service on path `/users`
const createService = require('feathers-memory');
const hooks = require('./user.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'user',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);
};
