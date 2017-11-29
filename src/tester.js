
const getUser = `{
  getUser(key: 1) {
    id
    uuid
    email
    firstName
    lastName
  }
}`;

const findUser = `{
  findUser {
    id
    uuid
    email
    firstName
    lastName
  }
}`;

module.exports = function tester(app) {
  const graphql = app.service('/graphql');

  graphql.find({ query: { graphql: findUser } })
    .then(response => {
      console.log('>>>>> findUser', response);

      return graphql.find({ query: { graphql: getUser } });
    })

    .then(response => {
      console.log('>>>>> getUser', response);
    })
    .catch(err => console.log(err));
};
