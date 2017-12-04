
const initNonSqlDb = require('./init-non-sql-db');
const initSqlDb = require('./init-sql-db');

module.exports = function initDb (app) {
  return initNonSqlDb(app)
    .then(() => {
      console.log('non-SQL DB initialized.');

      const sqlDb = app.service('graphql').sqlDb;
      console.log('aaaaaaaaaa', typeof sqlDb, sqlDb);
      if (!sqlDb) return;

      return initSqlDb(app)
        .then(() => console.log('SQL DB initialized.'));
    })
};
