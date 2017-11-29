
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Users1',
  description: 'Information about users.',
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
    id: { type: 'Id' },
    _id: { type: 'Id' },
    uuid: { type: 'Id' },
    email: {},
    firstName: {},
    lastName: {},
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: extension_header
    name: 'Userxxx', // GraphQL name
    sort: { id: 1 }, // Default sort for CRUD find query
    //!end
    discard: [
      //!code: extension_discard
      'mass', 'height'
      //!end
    ],
    add: {
      //!code: extension_add
      fullName: 'String!',
      supervisor: 'Userxxx',
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
