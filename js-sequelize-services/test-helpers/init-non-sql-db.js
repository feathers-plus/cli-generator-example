
const log = false;

let userDb;
let commentsDb;
let postDb;
let relationshipDb;

module.exports = async function initNonSqlDb (app) {
  let sequelize = app.get('sequelizeClient');

  async function executeSql(sql) {
    // eslint-disable-next-line no-console
    console.log(sql);

    return await sequelize.query(sql)
      .then(([result]) => result)
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log('executeSql error=', err.message);
        throw err;
      });
  }

  async function createTable(tableName, columnSpecs) {
    const sql =[
      'CREATE TABLE',
      tableName,
      '(id INTEGER PRIMARY KEY, uuid INTEGER, createdAt TIMESTAMP, updatedAt TIMESTAMP,',
      columnSpecs,
      ')',
    ].join(' ');

    await executeSql(sql);
  }
/*
  await executeSql('DROP TABLE IF EXISTS Accounts');
  await executeSql('DROP TABLE IF EXISTS Posts');
  await executeSql('DROP TABLE IF EXISTS Comments');
  await executeSql('DROP TABLE IF EXISTS Likes');
  await executeSql('DROP TABLE IF EXISTS Relationships');

  await createTable('Accounts', 'firstName TEXT, lastName TEXT, email TEXT, password TEXT');
  await createTable('Posts', 'authorUuid INTEGER, body TEXT, draft INTEGER');
  await createTable('Comments', 'authorUuid INTEGER, postUuid INTEGER, body TEXT, archived INTEGER');
  await createTable('Likes', 'authorUuid INTEGER, commentUuid INTEGER');
  await createTable('Relationships', 'followerUuid INTEGER, followeeUuid INTEGER');
*/
  const users = app.service('users');
  const posts = app.service('posts');
  const comments = app.service('comments');
  const likes = app.service('likes');
  const relationships = app.service('relationships');

  return Promise.all([
    users.remove(null, { query: {} }).then(result => console.log('\n.....users removed', result)),
    comments.remove(null, { query: {} }),
    posts.remove(null, { query: {} }),
    likes.remove(null, { query: {} }),
    relationships.remove(null, { query: {} })
  ])

    .then(() => console.log('\n.....Tables removed\n'))

    .then(() => Promise.all([
      users.create({ uuid: 0, firstName: 'John', lastName: 'Szwaronek', email: 'john@gmail.com', password: 'john' }),
      users.create({ uuid: 1, firstName: 'Jessica', lastName: 'Szwaronek', email: 'jessica@gmail.com', password: 'jessica' }),
      users.create({ uuid: 2, firstName: 'Nick', lastName: 'Roussis', email: 'nick@gmail.com', password: 'nick' }),
      users.create({ uuid: 3, firstName: 'Barbara', lastName: 'Lewis', email: '111barbara@gmail.com', password: 'barbara' })
    ]))
    .then(() => users.find())

    .then(result => {
      inspector('\n.....Users created. users.find=', result);
      return result;
    })

    .then(result => {
      userDb = (result.data || result).sort(sort('uuid'));
      if (true || log) inspector('userDB', userDb); // eslint-disable-line
    })

    .then(() => Promise.all([
      posts.create({ uuid: 90, authorUuid: userDb[0].uuid, body: 'Post 1', draft: 0 }),
      posts.create({ uuid: 91, authorUuid: userDb[3].uuid, body: 'Post 2', draft: 0 }),
      posts.create({ uuid: 92, authorUuid: userDb[1].uuid, body: 'Post 3', draft: 1 }),
      posts.create({ uuid: 93, authorUuid: userDb[1].uuid, body: 'Post 4', draft: 0 }),
      posts.create({ uuid: 94, authorUuid: userDb[1].uuid, body: 'Post 5', draft: 0 })
    ]))
    .then(() => posts.find())
    .then(result => {
      postDb = (result.data || result).sort(sort('uuid'));
      if (log) inspector('postDB', postDb); // eslint-disable-line
    })

    .then(() => Promise.all([
      comments.create({ uuid: 10, authorUuid: userDb[0].uuid, postUuid: postDb[0].uuid, body: 'Comment 1', archived: 0 }),
      comments.create({ uuid: 11, authorUuid: userDb[0].uuid, postUuid: postDb[0].uuid, body: 'Comment 2', archived: 0 }),
      comments.create({ uuid: 12, authorUuid: userDb[1].uuid, postUuid: postDb[0].uuid, body: 'Comment 3', archived: 0 }),
      comments.create({ uuid: 13, authorUuid: userDb[1].uuid, postUuid: postDb[1].uuid, body: 'Comment 4', archived: 0 }),
      comments.create({ uuid: 14, authorUuid: userDb[2].uuid, postUuid: postDb[1].uuid, body: 'Comment 5', archived: 0 }),
      comments.create({ uuid: 15, authorUuid: userDb[3].uuid, postUuid: postDb[1].uuid, body: 'Comment 6', archived: 1 })
    ]))
    .then(() => comments.find())
    .then(result => {
      commentsDb = (result.data || result).sort(sort('uuid'));
      if (log) inspector('commentsDB', commentsDb); // eslint-disable-line
    })

    .then(() => Promise.all(makelike(likes)))
    .then(() => likes.find())
    .then(result => {
      const likeDb = (result.data || result).sort(sort('uuid'));
      if (log) inspector('likeDb', likeDb); // eslint-disable-line
    })

    .then(() => Promise.all([
      relationships.create({ uuid: 80, followerUuid: userDb[0].uuid, followeeUuid: userDb[1].uuid }),
      relationships.create({ uuid: 81, followerUuid: userDb[2].uuid, followeeUuid: userDb[1].uuid }),
      relationships.create({ uuid: 82, followerUuid: userDb[3].uuid, followeeUuid: userDb[1].uuid }),
      relationships.create({ uuid: 83, followerUuid: userDb[1].uuid, followeeUuid: userDb[3].uuid })
    ]))
    .then(() => relationships.find())
    .then(result => {
      relationshipDb = (result.data || result).sort(sort('uuid'));
      if (log) inspector('relationshipDB', relationshipDb); // eslint-disable-line
    })

    .then(() => Promise.all([
      // foo.create({ uuid: 12345, foo: 1 }),
    ]))

    .catch(err => {
      console.log(err); // eslint-disable-line
      throw err;
    });
};

function sort (prop) {
  return (a, b) => a[prop] > b[prop] ? 1 : (a[prop] < b[prop] ? -1 : 0);
}

function makelike (likes) {
  const likePromises = [];
  let incr = 99;

  for (let i = 0; i < userDb.length; i++) {
    for (let j = 0; j < commentsDb.length; j++) {
      const data = { uuid: ++incr, authorUuid: userDb[i].uuid, commentUuid: commentsDb[j].uuid };
      likePromises.push(likes.create(data));
    }
  }

  return likePromises;
}

const { inspect } = require('util');
function inspector(desc, obj, depth = 5) {
  console.log(`\n${desc}`);
  console.log(inspect(obj, { depth, colors: true }));
}
