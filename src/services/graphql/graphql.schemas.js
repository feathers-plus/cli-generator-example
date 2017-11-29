
//!code: imports //!end
//!code: init //!end

let moduleExports = `
type Userxxx {
  id: Id
  _id: Id
  uuid: Id!
  email: String!
  firstName: String!
  lastName: String!
  fullName: String!
  supervisor: Userxxx
}

Query: {
  // CRUD queries for Userxxx
  getUserxxx(key: JSON, query: JSON, params: JSON): Userxxx
  findUserxxx(query: JSON, params: JSON): [Userxxx]!
}
`;

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
