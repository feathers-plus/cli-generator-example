
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: 'Zmongoosea',
  description: 'Zmongoosea database.',
  //!end
  required: [
    //!code: schema_required
    '_id', 'twitter'
    //!end
  ],
  properties: {
    //!code: schema_properties
    _id: { type: 'ID' },
    name: {
      required: [ 'firstName'],
      properties: {
        firstName: {},
        lastName: {}
      }
    },
    biography: {},
    twitter: {},
    facebook: {},
    linkedin: {},
    created: { type: 'date' }
    //!end
  },
  //!code: schema_more //!end
};

let extensions = {
  graphql: {
    //!<DEFAULT> code: graphql_header
    // name: 'Zmongoosea',
    // service : {
    //   sort: { __id__: 1 },
    // },
    // sql: {
    //   sqlTable: 'Zmongoosea',
    //   uniqueKey: '__id__',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   }
    // },
    //!end,
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
    //!<DEFAULT> code: graphql_add
      // __author__: { type: '__User__!', args: false, relation: { ourTable: '__authorId__', otherTable: '__id__' } },
      //!end
    },
    //!code: graphql_more //!end
  },
};

//!code: more //!end

let moduleExports = {
  schema,
  extensions,
  //!code: moduleExports //!end
};

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
