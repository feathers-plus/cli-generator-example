
// Define the Feathers schema for service `comments`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Comments',
  description: 'Comments database.',
  // !end
  // !code: schema_definitions
  definitions: {
    id: {
      description: 'unique identifier',
      type: 'ID',
      minLength: 1,
      readOnly: true
    }
  },
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'uuid', 'authorUuid'
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    id: { $ref: '#/definitions/id' },
    _id: { type: 'ID', a: 1 },
    uuid: { type: 'integer' },
    authorUuid: { type: 'integer' },
    postUuid: { type: 'integer' },
    body: { $ref: 'body.json' },
    archived: { type: 'integer' }
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
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
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !code: graphql_add
      author: { type: 'User!', args: false, relation: { ourTable: 'authorUuid', otherTable: 'uuid' } },
      likes: { type: '[Like!]', args: false, relation: { ourTable: 'uuid', otherTable: 'commentUuid' }  },
      // !end
    },
    // !code: graphql_more // !end
  },
};

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
