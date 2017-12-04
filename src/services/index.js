const user = require('./user/user.service.js');
const graphql = require('./graphql/graphql.service.js');
const comment = require('./comment/comment.service.js');
const like = require('./like/like.service.js');
const post = require('./post/post.service.js');
const relationship = require('./relationship/relationship.service.js');
module.exports = function (app) {
  app.configure(user);
  app.configure(comment);
  app.configure(like);
  app.configure(post);
  app.configure(relationship);

  app.configure(graphql);
};
