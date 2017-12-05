
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
    //!end
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
      //!code: graphql_add
      author: {
        type: 'User!',
        args: false,
        service: {
          resolver: ({ authorUuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { uuid: authorUuid, $sort: { uuid: 1 } }
            });
            return options.services.user.find(feathersParams).then(extractFirstItem)
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.author_uuid = ' + otherTable + '.uuid'; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); },
        },
      },
      likes: {
        type: '[Like!]',
        args: false,
        service: {
          resolver: ({ uuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { commentUuid: uuid, $sort: { uuid: 1 } }
            });
            return options.services.like.find(feathersParams).then(extractAllItems);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.comment_uuid'; },
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
