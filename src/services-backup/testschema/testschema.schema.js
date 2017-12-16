
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Test-Schema',
  description: 'Test schema conversion to model',
  //!end
  type: 'object',
  required: [
    //!code: schema_required
    'str1', 'uuid'
    //!end
  ],
  properties: {
    //!code: schema_properties
    str1: {
      type: 'string',
      pattern: '^[0-9]+$'
    },
    str2: {},
    int1: {
      type: 'integer',
      minimum: 13,
      maximum: 110,
      exclusiveMinimum: true
    },
    array1: {
      type: 'array',
      items: [{ type: 'integer' }], },
    uuid: {
      type: 'ID'
    },
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!<DEFAULT> code: graphql_header
    // name: '...',
    // service : {
    //   sort: { id: 1 },
    // },
    // sql: {
    // sqlTable: 'Accounts',
    //   uniqueKey: 'uuid',
    //   sqlColumn: {
    //   email: { sqlColumn: 'email_address' },
    //   firstName: { sqlColumn: 'first_name' },
    //   lastName: { sqlColumn: 'last_name' },
    // },
    //!end,
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
    //!<DEFAULT> code: graphql_add
      // ___ZZZ___: { type: 'User!', args: false },
      //!end
    },
    //!code: graphql_more //!end
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
