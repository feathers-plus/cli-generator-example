
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!default code: schema_header
  title: '...',
  description: '...',
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
    //!code: extension_header
    name: 'Relationship',
    sort: { uuid: 1 },
    //!end
    discard: [
      //!code: extension_discard //!end
    ],
    add: {
      //!code: extension_add
      follower: {
        type: 'User!',
        args: false,
        resolver: ({ followerUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: followerUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
        },
      },
      followee: {
        type: 'User!',
        args: false,
        resolver: ({ followeeUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: followeeUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
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
