
// Initializes the `relationships` service on path `/relationships`. (Can be re-generated.)
const createService = require('feathers-sequelize');
const createModel = require('../../models/relationships.model');
const hooks = require('./relationships.hooks');
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app);
  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    name: 'relationships',
    Model,
    paginate,
    // !code: options_more
    id: 'uuid',
    // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  app.use('/relationships', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('relationships');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
