
/*
const getUser = `{
  getUser(key: 1) {
    id
    uuid
    email
    firstName
    lastName
    fullName
  }
}`;

const findUser = `{
  findUser {
    id
    uuid
    email
    firstName
    lastName
    fullName
  }
}`;

const getComment = `{
  getComment(key: 10) {
    id
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
*/
const getUser = `{
  getUser(key: 1) {
    uuid
    email
    firstName
    lastName
  }
}`;

const findUser = `{
  findUser {
    uuid
    email
    firstName
    lastName
  }
}`;

const getComment = `{
  getComment(key: 10) {
    uuid
    authorUuid 
    postUuid 
    body 
    archived 
    author {
      uuid
      email
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
    })
    .catch(err => console.log(err));
};
