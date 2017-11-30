
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!code: schema_header
  title: 'Users1',
  description: 'Information about users.',
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
    //!code: extension_header
    name: 'User', // GraphQL name
    sort: { id: 1 }, // Default sort for CRUD find query
    //!end
    discard: [
      //!code: extension_discard
      'mass', 'height'
      //!end
    ],
    add: {
      //!code: extension_add
      fullName: {
        type: 'String!',
        args: false,
        resolver: ({ firstName, lastName }, args, context, ast) => `${firstName} ${lastName}`,
      },
      posts: {
        type: '[Post!]',
        // args: false,
        resolver: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.post.find(feathersParams).then(extractAllItems);
        },
      },
      comments: {
        type: '[Comment!]',
        args: false,
        resolver: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.comment.find(feathersParams).then(extractAllItems);
        },
      },
      followed_by: {
        type: '[Relationship!]',
        args: false,
        resolver: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followeeUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.relationship.find(feathersParams).then(extractAllItems);
        },
      },
      following: {
        type: '[Relationship!]',
        args: false,
        resolver: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followerUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.relationship.find(feathersParams).then(extractAllItems);
        },
      },
      likes: {
        type: '[Like!]',
        args: false,
        resolver: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: {authorUuid: uuid, $sort: {uuid: 1}}
          });
          return options.services.like.find(feathersParams).then(extractAllItems);
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
