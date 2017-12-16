
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Comment1',
  description: 'Comment data',
  //!end
  type: 'object',
  required: [
    //!code: schema_required //!end
  ],
  properties: {
    //!code: schema_properties
    id: { type: 'ID' },
    _id: { type: 'ID' },
    uuid: { type: 'ID' },
    authorUuid: { type: 'ID' },
    postUuid: { type: 'ID' },
    body: { type: 'string' },
    archived: { type: 'integer' }
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: graphql_header
    name: 'Comment',
    service: {
      sort: { uuid: 1 },
    },
    sql: {
      sqlTable: 'Comments',
      uniqueKey: 'uuid',
      sqlColumn: {
        authorUuid: 'author_uuid',
        postUuid: 'post_uuid',
      },
    },
    //!end,
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
    //!code: graphql_add
      author: { type: 'User!', args: false },
      likes: { type: '[Like!]', args: false },
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
