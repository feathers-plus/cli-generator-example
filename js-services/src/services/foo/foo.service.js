
// Initializes the `foo` service on path `/foo`. (Can be re-generated.)
const createService = require('feathers-sequelize');
const createModel = require('../../models/foo.model');
const hooks = require('./foo.hooks');
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app);
  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    name: 'foo',
    Model,
    paginate,
    // !code: options_more // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  app.use('/foo', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('foo');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
