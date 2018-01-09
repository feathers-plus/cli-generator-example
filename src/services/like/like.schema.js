
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: 'Like',
  description: 'Like database.',
  //!end
  //!code: schema_definitions //!end
  required: [
    //!code: schema_required //!end
  ],
  properties: {
    //!code: schema_properties
    id: { type: 'ID' },
    _id: { type: 'ID' },
    uuid: { type: 'ID' },
    authorUuid: { type: 'ID' },
    commentUuid: { type: 'ID'},
    //!end
  },
  //!code: schema_more //!end
};

let extensions = {
  graphql: {
    //!code: graphql_header
    name: 'Like',
    service: {
      sort: { uuid: 1 },
    },
    sql: {
      sqlTable: 'Likes',
      uniqueKey: 'uuid',
      sqlColumn: {
        authorUuid: 'author_uuid',
        commentUuid: 'comment_uuid',
      },
    },
    //!end
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
      //!code: graphql_add
      author: { type: 'User!', args: false, relation: { ourTable: 'authorUuid', otherTable: 'uuid' } },
      comment: { type: 'Comment!', args: false, relation: { ourTable: 'commentUuid', otherTable: 'uuid' } },
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
