
const initNonSqlDb = require('./init-non-sql-db');

module.exports = function initDb (app) {
  return initNonSqlDb(app)
    .then(() => {
      console.log('DB initialized using Feathers services.');
    })
};
