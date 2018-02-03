
// Initializes the `comment` service on path `/comment`
const createService = require('feathers-mongodb');
const hooks = require('./comment.hooks');
//!code: mongo_imports //!end
//!code: mongo_init //!end

let moduleExports = function (app) {
  let paginate = app.get('paginate');
  let mongoClient = app.get('mongoClient');
  let options = { paginate };
  //!code: mongo_func_init //!end

  // Initialize our service with any options it requires
  app.use('/comment', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comment');

  mongoClient.then(db => {
    service.Model = db.collection('comment');
  });

  service.hooks(hooks);
  //!code: mongo_func_return //!end
};
//!code: mongo_more //!end

//!code: mongo_exports //!end
module.exports = moduleExports;

//!code: mongo_funcs //!end
//!code: mongo_end //!end
