// Initializes the `testschema` service on path `/testschema`
const createService = require('feathers-nedb');
const createModel = require('../../models/testschema.model');
const hooks = require('./testschema.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'testschema',
    Model,
    paginate,
    //!code: options_more //!end
  };

  // Initialize our service with any options it requires
  app.use('/testschema', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('testschema');

  service.hooks(hooks);
};
