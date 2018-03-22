
const initNonSqlDb = require('./init-non-sql-db');
const initSqlDb = require('./init-sql-db');

module.exports = function initDb (app) {
  return initNonSqlDb(app)
    .then(() => {
      console.log('non-SQL DB initialized.');

      const executeSql = app.service('graphql').executeSql;
      if (!executeSql) return;

      return initSqlDb(app)
        .then(() => console.log('SQL DB initialized.'));
    })
};
