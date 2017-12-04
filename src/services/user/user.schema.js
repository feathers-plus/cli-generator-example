
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: 'Users1',
  description: 'User data',
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
    id: { type: 'ID' },
    _id: { type: 'ID' },
    uuid: { type: 'ID' },
    email: {},
    firstName: {},
    lastName: {},
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: graphql_header
    name: 'User',
    service : {
      sort: { id: 1 },
    },
    sql: {
      sqlTable: 'Accounts',
      uniqueKey: 'uuid',
      sqlColumn: {
        email: 'email_address',
        firstName: 'first_name',
        lastName: 'last_name',
      },
    },
    //!end
    discard: [
      //!code: graphql_discard
      'mass', 'height'
      //!end
    ],
    add: {
      //!code: graphql_add
      fullName: {
        type: 'String!',
        args: false,
        service: {
          resolver: ({ firstName, lastName }, args, context, ast) => `${firstName} ${lastName}`,
        },
        sql: {
          sqlExpr: (tableName, args) => `${tableName}.first_name || ' ' || ${tableName}.last_name`,
        },
      },
      posts: {
        type: '[Post!]',
        // args: false,
        service: {
          resolver: ({ uuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { authorUuid: uuid, $sort: { uuid: 1 } }
            });
            return options.services.post.find(feathersParams).then(extractAllItems);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.author_uuid'; },
          orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
          where(table, args) { return makeWhere(table, args, 'uuid', {"body":{"$ne":"xxx"}}); },
        },
      },
      comments: {
        type: '[Comment!]',
        args: false,
        service: {
          resolver: ({ uuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { authorUuid: uuid, $sort: { uuid: 1 } }
            });
            return options.services.comment.find(feathersParams).then(extractAllItems);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.author_uuid'; },
          orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
        },
      },
      followed_by: {
        type: '[Relationship!]',
        args: false,
        service: {
          resolver: ({ uuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { followeeUuid: uuid, $sort: { uuid: 1 } }
            });
            return options.services.relationship.find(feathersParams).then(extractAllItems);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.followee_uuid'; },
          orderBy(args, content) { return makeOrderBy(args, { uuid: -1 }); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
        },
      },
      following: {
        type: '[Relationship!]',
        args: false,
        service: {
          resolver: ({ uuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { followerUuid: uuid, $sort: { uuid: 1 } }
            });
            return options.services.relationship.find(feathersParams).then(extractAllItems);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.follower_uuid'; },
          orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
        },
      },
      likes: {
        type: '[Like!]',
        args: false,
        service: {
          resolver: ({ uuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: {authorUuid: uuid, $sort: {uuid: 1}}
            });
            return options.services.like.find(feathersParams).then(extractAllItems);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.author_uuid'; },
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
