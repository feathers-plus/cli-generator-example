
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Relationship1',
  description: 'Relationship data',
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
    followerUuid: { type: 'ID' },
    followeeUuid: { type: 'ID' },
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: graphql_header
    name: 'Relationship',
    service: {
      sort: { uuid: 1 },
    },
    sql: {
      sqlTable: 'Relationships',
      uniqueKey: 'uuid',
      sqlColumn: {
        followerUuid: 'follower_uuid',
        followeeUuid: 'followee_uuid',
      },
    },
    //!end
    discard: [
      //!code: graphql_discard //!end
    ],
    add: {
      //!code: graphql_add
      follower: {
        type: 'User!',
        args: false,
        service: {
          resolver: ({ followerUuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { uuid: followerUuid, $sort: { uuid: 1 } }
            });
            return options.services.user.find(feathersParams).then(extractFirstItem);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.follower_uuid = ' + otherTable + '.uuid'; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'follower_uuid', undefined); },
        },
      },
      followee: {
        type: 'User!',
        args: false,
        service: {
          resolver: ({ followeeUuid }, args, content, ast) => {
            const feathersParams = convertArgsToFeathers(args, {
              query: { uuid: followeeUuid, $sort: { uuid: 1 } }
            });
            return options.services.user.find(feathersParams).then(extractFirstItem);
          },
        },
        sql: {
          sqlJoin(ourTable, otherTable) { return ourTable + '.followee_uuid = ' + otherTable + '.uuid'; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'followee_uuid', undefined); },
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
