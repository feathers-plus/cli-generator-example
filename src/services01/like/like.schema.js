
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Like1',
  description: 'Like DB',
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
    commentUuid: { type: 'ID'},
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
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
      author: {
        type: 'User!',
        args: false,
        service: {
          resolver: ({ authorUuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { uuid: authorUuid, $sort: { uuid: 1 } }
            });
            return options.services.user.find(feathersParams).then(extractFirstItem);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.author_uuid = ' + otherTable + '.uuid'; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); },
        },
      },
      comment: {
        type: 'Comment!',
        args: false,
        service: {
          resolver: ({ commentUuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { uuid: commentUuid, $sort: { uuid: 1 } }
            });
            return options.services.comment.find(feathersParams).then(extractFirstItem);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.comment_uuid = ' + otherTable + '.uuid'; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'comment_uuid', undefined); },
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
