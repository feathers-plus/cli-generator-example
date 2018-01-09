
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: 'Comment',
  description: 'Comment database.',
  //!end
  //!code: schema_definitions
  definitions: {
    id: {
      description: 'unique identifier',
      type: 'ID',
      minLength: 1,
      readOnly: true
    }
  },
  //!end
  required: [
    //!code: schema_required //!end
  ],
  properties: {
    //!code: schema_properties
    id: { type: 'ID' },
    _id: { $ref: '#/definitions/id' },
    uuid: { type: 'ID' },
    authorUuid: { type: 'ID' },
    postUuid: { type: 'ID' },
    body: { $ref: 'body.json' },
    archived: { type: 'integer' }
    //!end
  },
  //!code: schema_more //!end
};

let extensions = {
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
    //!end
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
      //!code: graphql_add
      author: { type: 'User!', args: false, relation: { ourTable: 'authorUuid', otherTable: 'uuid' } },
      likes: { type: '[Like!]', args: false, relation: { ourTable: 'uuid', otherTable: 'commentUuid' }  },
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
