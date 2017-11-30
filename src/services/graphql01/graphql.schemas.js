
//!code: imports //!end
//!code: init //!end

let moduleExports = `
type User {
  id: ID
  _id: ID
  uuid: ID!
  email: String!
  firstName: String!
  lastName: String!
  fullName: String!
}

type Query {
  getUser(key: JSON, query: JSON, params: JSON): User
  findUser(query: JSON, params: JSON): [User]!
}
`;

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
