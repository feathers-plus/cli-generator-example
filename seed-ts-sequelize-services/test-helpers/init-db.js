
const initFeathersDb = require('./init-feathers-db');

module.exports = function initDb (app) {
  return initFeathersDb(app)
    .then(() => {
      console.log('DB initialized using Feathers services.');
    })
};
