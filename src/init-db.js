
const initNonSqlDb = require('../test-helpers/init-non-sql-db');
//const initSqlDb = require('../test-helpers/init-sql-db');

module.exports = function initDb (app) {
  return initNonSqlDb(app)
    .then(() => {
      console.log('non-SQL DB initialized.');

      /*
      const sqlDb = app.service('graphql').sqlDb;
      if (!sqlDb) return;

      return initSqlDb(app)
        .then(() => console.log('SQL DB initialized.'));
        */
    })
};
