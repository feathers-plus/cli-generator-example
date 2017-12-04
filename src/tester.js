
const asyncTest = require('../test-helpers/async-test');

const getUser = `{
  getUser(key: 1) {
    _id
    uuid
    email
    firstName
    lastName
    fullName
  }
}`;

const findUser = `{
  findUser {
    _id
    uuid
    email
    firstName
    lastName
    fullName
  }
}`;

const getComment = `{
  getComment(key: 10) {
    _id
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

module.exports = function tester(app) {
  const graphql = app.service('/graphql');

  graphql.find({ query: { graphql: findUser } })
    .then(response => {
      console.log('>>>>> findUser\n', response);

      return graphql.find({ query: { graphql: getUser } });
    })
    .then(response => {
      console.log('>>>>> getUser(key: 1)\n', response);

      return graphql.find({ query: { graphql: getComment } });
    })
    .then(response => {
      console.log('>>>>> getComment(key: 10)\n', response);

      console.log('>>>>> start async test');
      asyncTest(app, 10);
    })
    .catch(err => console.log(err));
};
