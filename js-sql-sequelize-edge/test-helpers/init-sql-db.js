
const log = false;
let results;
let executeSql;

module.exports = async function initSqlDb (app) { // eslint-disable-line
  const comments = app.service('comments');
  const likes = app.service('likes');
  const posts = app.service('posts');
  const relationships = app.service('relationships');
  const users = app.service('users');
  // const foo = app.service('foo');

  executeSql = app.service('graphql').executeSql;

  results = await users.find({ query: { $sort: { uuid: 1 } } });
  await copyServiceToTable(results.data, 'Accounts', {
    columns: {
      uuid: { type: 'INTEGER PRIMARY KEY' },
      firstName: { name: 'first_name' },
      lastName: { name: 'last_name' },
      email: { name: 'email_address' },
      password: { name: 'password' }
    }
  });

  results = await posts.find({ query: { $sort: { uuid: 1 } } });
  await copyServiceToTable(results.data, 'Posts', {
    columns: {
      uuid: { type: 'INTEGER PRIMARY KEY' },
      authorUuid: { name: 'author_uuid' }
    }
  });

  results = await comments.find({ query: { $sort: { uuid: 1 } } });
  await copyServiceToTable(results.data, 'Comments', {
    columns: {
      uuid: { type: 'INTEGER PRIMARY KEY' },
      authorUuid: { name: 'author_uuid' },
      postUuid: { name: 'post_uuid' }
    }
  });

  results = await likes.find({ query: { $sort: { uuid: 1 } } });
  await copyServiceToTable(results.data, 'Likes', {
    columns: {
      uuid: { type: 'INTEGER PRIMARY KEY' },
      authorUuid: { name: 'author_uuid' },
      commentUuid: { name: 'comment_uuid' }
    }
  });

  results = await relationships.find({ query: { $sort: { uuid: 1 } } });
  await copyServiceToTable(results.data, 'Relationships', {
    columns: {
      uuid: { type: 'INTEGER PRIMARY KEY' },
      followerUuid: { name: 'follower_uuid' },
      followeeUuid: { name: 'followee_uuid' }
    }
  });

  // results = await foo.find({ query: { $sort: { uuid: 1 } } });
  // await copyServiceToTable(results.data, 'Foo', {
  //   columns: {
  //     uuid: { type: 'INTEGER PRIMARY KEY' },
  //     foo: { name: 'foo' }
  //   }
  // });
};

// todo enhancement: ensure support for different flavors of SQL
async function copyServiceToTable (data, tableName, options = {}) {
  let columns = options.columns || {};

  if (typeof tableName !== 'string' || !tableName) throw new Error('No table name provided. (copyServiceToTable)');
  if (!Array.isArray(data)) throw new Error(`"${tableName}" data is not an array. (copyServiceToTable)`);

  if (!data.length && !columns) throw new Error(`"${tableName}" has no data and no column info is provided. (copyServiceToTable)`);

  const sample = data[0];
  if (typeof sample !== 'object' || sample === null) throw new Error(`"${tableName}" has no data[0] not an object. (copyServiceToTable)`);

  const expandedColumns = Object.keys(sample).reduce((expandedColumns, key) => {
    expandedColumns[key] = columns[key] || {};
    const expandedColumn = expandedColumns[key];

    if (!expandedColumn.name) expandedColumn.name = key;
    if (!expandedColumn.type) expandedColumn.type = typeof sample[key] === 'string' ? 'TEXT' : 'INTEGER';

    return expandedColumns;
  }, {});

  const schema = Object.keys(expandedColumns).reduce((schema, key, i) => {
    const column = expandedColumns[key];
    return `${schema}${i ? ', ' : ''}${column.name} ${column.type || 'TEXT'}`;
  }, '');

  const fieldList = Object.keys(expandedColumns).reduce((fieldList, key, i) => {
    const column = expandedColumns[key];
    return `${fieldList}${i ? ', ' : ''}${column.name}`;
  }, '');

  await executeSql(`DROP TABLE IF EXISTS ${tableName}`);
  await executeSql(`CREATE TABLE ${tableName} (${schema})`);

  for (let i = 0, lenI = data.length; i < lenI; i++) {
    const valueList = Object.keys(expandedColumns).reduce((valueList, key, j) => {
      const { type } = expandedColumns[key];
      const quote = type && type !== 'TEXT' ? '' : '"';
      let value = data[i][key];
      return `${valueList}${j ? ', ' : ''}${quote}${value}${quote}`;
    }, '');

    await executeSql(`INSERT INTO ${tableName} (${fieldList}) VALUES (${valueList})`);
  }

  const all = await executeSql(`SELECT * FROM ${tableName}`);
  if (log) inspector(tableName, all);
}

const { inspect } = require('util');
function inspector(desc, obj, depth = 5) {
  console.log(`\n${desc}`);
  console.log(inspect(obj, { depth, colors: true }));
}
