
/* eslint-disable no-console */
const asyncTest = require('../test-helpers/async-test');

const idName = '_id'; // todo ???????????????????
const log = false;

module.exports = function testGraphql(app) {
  const { getUser, findUser, getComment } = getTestQueries(idName);

  const graphql = app.service('/graphql');
  console.log('>>>>> start sync test');

  log && console.log('\n<<<<< findUser', findUser);
  graphql.find({ query: { query: findUser } })
    .then(response => {
      log && inspector('>>>>> findUser', response);

      log && console.log('\n<<<<< getUser', getUser);
      return graphql.find({ query: { query: getUser } });
    })
    .then(response => {
      log && inspector('>>>>> getUser(key: 1)', response);

      log && console.log('\n>>>>> getComment', getComment);
      return graphql.find({ query: { query: getComment } });
    })
    .then(response => {
      log && inspector('>>>>> getComment(key: 10)', response);

      console.log('>>>>> start async test');
      asyncTest(app, 10);
    })
    .catch(err => console.log(err));
};

function getTestQueries(idName) {
  const getUser = `{
  getUser(key: 1) {
    ${idName}
    uuid
    email
    firstName
    lastName
    fullName
  }
}`;

  const findUser = `{
  findUser {
    ${idName}
    uuid
    email
    firstName
    lastName
    fullName
  }
}`;

  const getComment = `{
  getComment(key: 10) {
    ${idName}
    uuid
    authorUuid
    postUuid
    body
    archived
    author {
      uuid
      email
      fullName
    }
  }
}`;

  return { getUser, findUser, getComment };
}

const { inspect } = require('util');
function inspector(desc, obj, depth = 5) {
  console.log(`\n${desc}`);
  console.log(inspect(obj, { depth, colors: true }));
}
