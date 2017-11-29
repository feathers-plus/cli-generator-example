
const log = true;

let userDb;
let commentsDb;
let postDb;
let relationshipDb;

module.exports = function initNonSqlDb (app) {
  const user = app.service('user');

  return Promise.all([
    user.remove(null, { query: {} }),
  ])
    .then(() => Promise.all([
      user.create({ uuid: 0, firstName: 'John', lastName: 'Szwaronek', email: 'john@gmail.com' }),
      user.create({ uuid: 1, firstName: 'Jessica', lastName: 'Szwaronek', email: 'jessica@gmail.com' }),
      user.create({ uuid: 2, firstName: 'Nick', lastName: 'Roussis', email: 'nick@gmail.com' }),
      user.create({ uuid: 3, firstName: 'Barbara', lastName: 'Lewis', email: 'barbara@gmail.com' })
    ]))
    .then(() => user.find())
    .then(result => {
      userDb = result.sort(sort('uuid'));
      if (log) console.log('userDB\n', userDb); // eslint-disable-line
    })

    .catch(err => {
      console.log(err); // eslint-disable-line
      throw err;
    });
};

function sort (prop) {
  return (a, b) => a[prop] > b[prop] ? 1 : (a[prop] < b[prop] ? -1 : 0);
}

function makelike (like) {
  const likePromises = [];
  let incr = 99;

  for (let i = 0; i < userDb.length; i++) {
    for (let j = 0; j < commentsDb.length; j++) {
      const data = { uuid: ++incr, authorUuid: userDb[i].uuid, commentUuid: commentsDb[j].uuid };
      likePromises.push(like.create(data));
    }
  }

  return likePromises;
}
