
// knex.js - Knex adapter
const knex = require('knex');
// !code: imports // !end
// !code: init // !end

module.exports = function(app) {
  let { client, connection } = app.get('sqlite');
  let db = knex({ client, connection });

  app.set('knexClient', db);
  // !code: more // !end
};
// !code: funcs // !end
// !code: end // !end
