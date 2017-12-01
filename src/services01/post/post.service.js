// Initializes the `post` service on path `/post`
const createService = require('feathers-memory');
const hooks = require('./post.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'post',
    paginate,
    //!code: options_more
    id: 'uuid',
    //!end
  };

  // Initialize our service with any options it requires
  app.use('/post', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('post');

  service.hooks(hooks);
};
