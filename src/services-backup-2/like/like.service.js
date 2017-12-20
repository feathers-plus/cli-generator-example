// Initializes the `like` service on path `/like`
const createService = require('feathers-nedb');
const createModel = require('../../models/like.model');
const hooks = require('./like.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'like',
    Model,
    paginate,
    //!code: options_more
    id: 'uuid',
    //!end
  };

  // Initialize our service with any options it requires
  app.use('/like', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('like');

  service.hooks(hooks);
};
