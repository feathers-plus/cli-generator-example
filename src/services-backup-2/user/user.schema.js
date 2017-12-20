
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: 'Users1',
  description: 'User data',
  //!end
  type: 'object',
  required: [
    //!code: schema_required
    'uuid',
    'email',
    'firstName',
    'lastName'
    //!end
  ],
  properties: {
    //!code: schema_properties
    id: { type: 'ID' },
    _id: { type: 'ID' },
    uuid: { type: 'ID' },
    email: {},
    firstName: {},
    lastName: {},
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: graphql_header
    name: 'User',
    service : {
      sort: { id: 1 },
    },
    sql: {
      sqlTable: 'Accounts',
      uniqueKey: 'uuid',
      sqlColumn: {
        email: 'email_address',
        firstName: 'first_name',
        lastName: 'last_name',
      },
    },
    //!end
    discard: [
      //!code: graphql_discard
      'mass', 'height'
      //!end
    ],
    add: {
      //!code: graphql_add
      comments:    { type: '[Comment!]',      args: false, relation: { ourTable: 'uuid', otherTable: 'authorUuid' } },
      followed_by: { type: '[Relationship!]', args: false, relation: { ourTable: 'uuid', otherTable: 'followeeUuid' } },
      following:   { type: '[Relationship!]', args: false, relation: { ourTable: 'uuid', otherTable: 'followerUuid' } },
      fullName:    { type: 'String!',         args: false },
      likes:       { type: '[Like!]',         args: false, relation: { ourTable: 'uuid', otherTable: 'authorUuid' } },
      posts:       { type: '[Post!]'                     , relation: { ourTable: 'uuid', otherTable: 'authorUuid' } },
      //!end
    },
    //!code: extension_more //!end
  },
};

//!code: more //!end

let moduleExports = {
  schema,
  extension,
  //!code: moduleExports //!end
};

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
