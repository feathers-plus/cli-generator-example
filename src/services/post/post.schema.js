
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Post1',
  description: 'Post data',
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
    body: {},
    draft: { type: 'integer' },
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: graphql_header
    name: 'Post',
    service: {
      sort: { uuid: 1 },
    },
    sql: {
      sqlTable: 'Posts',
      uniqueKey: 'uuid',
      sqlColumn: {
        authorUuid: 'author_uuid',
      },
    },
    //!end
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
      //!code: graphql_add
      author: {
        type: 'User!',
        args: false,
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.author_uuid = ' + otherTable + '.uuid'; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); },
        },
      },
      comments: {
        type: '[Comment!]',
        args: false,
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.post_uuid'; },
          orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
        },
      },
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
