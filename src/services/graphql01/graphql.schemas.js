
let moduleExports = `
  type User {
    id: ID!
    uuid: ID!
    email: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    getUser(query: JSON, params: JSON, key: JSON): User
    findUser: [User!]
  }
`;

module.exports = moduleExports;
