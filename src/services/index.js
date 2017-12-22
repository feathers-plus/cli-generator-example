
// Configure Feathers services.
let comment = require('./comment/comment.service');
let like = require('./like/like.service');
let post = require('./post/post.service');
let relationship = require('./relationship/relationship.service');
let serviceAa1 = require('./service-aa-1/service-aa-1.service');
let user = require('./user/user.service');
let zmongoosea = require('./zmongoosea/zmongoosea.service');

let graphql = require('./graphql/graphql.service');
//!code: imports //!end
//!code: init //!end

let moduleExports = function (app) {
  app.configure(comment);
  app.configure(like);
  app.configure(post);
  app.configure(relationship);
  app.configure(serviceAa1);
  app.configure(user);
  app.configure(zmongoosea);

  app.configure(graphql);
  //!code: func_return //!end
};

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
