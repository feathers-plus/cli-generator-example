
// Initializes the `relationship` service on path `/relationship`. (Can be re-generated.)
const createService = require('feathers-nedb');
const createModel = require('../../models/relationship.model');
const hooks = require('./relationship.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'relationship',
    Model,
    paginate,
    //!code: options_more
    id: 'uuid',
    //!end
  };

  // Initialize our service with any options it requires
  app.use('/relationship', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('relationship');

  service.hooks(hooks);
};
