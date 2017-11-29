const user = require('./user/user.service.js');
const test = require('./test/test.service.js');
const graphql = require('./graphql/graphql.service.js');
const graphql = require('./graphql/graphql.service.js');
module.exports = function (app) {
  app.configure(user);
  app.configure(test);
  app.configure(graphql);
  app.configure(graphql);
};
