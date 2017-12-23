// Initializes the `zRef1` service on path `/z-ref-1`
const createService = require('feathers-nedb');
const createModel = require('../../models/z-ref-1.model');
const hooks = require('./z-ref-1.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'z-ref-1',
    Model,
    paginate,
    //!code: options_more //!end
  };

  // Initialize our service with any options it requires
  app.use('/z-ref-1', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('z-ref-1');

  service.hooks(hooks);
};
