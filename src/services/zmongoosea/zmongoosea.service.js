// Initializes the `zmongoosea` service on path `/zmongoosea`
const createService = require('feathers-nedb');
const createModel = require('../../models/zmongoosea.model');
const hooks = require('./zmongoosea.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'zmongoosea',
    Model,
    paginate,
    //!code: options_more //!end
  };

  // Initialize our service with any options it requires
  app.use('/zmongoosea', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('zmongoosea');

  service.hooks(hooks);
};
