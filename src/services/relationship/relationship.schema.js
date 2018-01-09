
// Define the Feathers schema for service `relationship`. (Can be re-generated.)
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: 'Relationship',
  description: 'Relationship database.',
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
    followerUuid: { type: 'ID' },
    followeeUuid: { type: 'ID' },
    //!end
  },
  //!code: schema_more //!end
};

let extensions = {
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
      follower: { type: 'User!', args: false, relation: { ourTable: 'followerUuid', otherTable: 'uuid' } },
      followee: { type: 'User!', args: false, relation: { ourTable: 'followeeUuid', otherTable: 'uuid' } },
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
