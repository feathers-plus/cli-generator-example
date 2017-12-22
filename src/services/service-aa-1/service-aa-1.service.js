// Initializes the `serviceAa1` service on path `/service--aa--1`
const createService = require('feathers-nedb');
const createModel = require('../../models/service-aa-1.model');
const hooks = require('./service-aa-1.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'service-aa-1',
    Model,
    paginate,
    //!code: options_more //!end
  };

  // Initialize our service with any options it requires
  app.use('/service--aa--1', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('service--aa--1');

  service.hooks(hooks);
};
