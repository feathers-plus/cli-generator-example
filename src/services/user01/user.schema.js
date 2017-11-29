
module.exports.schema = {
  title: 'Users1',
  $schema: 'http://json-schema.org/draft-04/schema',
  description: 'Information about users.',
  type: 'object',
  required: [
    'uuid',
    'email',
    'firstName',
    'lastName'
  ],
  properties: {
    id: { type: 'Id' },
    _id: { type: 'Id' },
    uuid: { type: 'Id' },
    email: {},
    firstName: {},
    lastName: {},
  },
};

module.exports.extension = {
  graphql: {
    name: 'Userxxx', // GraphQL name
    sort: { id: 1 }, // Default sort for CRUD find query
    discard: [ 'mass', 'height' ], // Fields to exclude from GraphQL schema.
    add: {
      fullName: 'String!',
      supervisor: 'Userxxx',
    },
    /*
    resolvers: (app, options) => ({
      fullName: (parent, args, context, ast) => `${parent.firstName} ${parent.lastName}`,
      supervisor: (parent, args, content, ast) => {
        const feathersParams = convertArgsToFeathers(args, { query: { uuid: parent.supervisorId } });
        return options.services.user.find(feathersParams).then(extractFirstItem);
      },
    })
    */
  },
};
