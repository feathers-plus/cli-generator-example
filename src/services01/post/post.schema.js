
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
    authorUuid: { type: 'ID' },
    body: {},
    draft: { type: 'integer' },
    //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!code: extension_header
    name: 'Post',
    sort: { uuid: 1 },
    //!end
    discard: [
      //!code: extension_discard //!end
    ],
    add: {
      //!code: extension_add
      author: {
        type: 'User!',
        args: false,
        resolver: ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
        },
      },
    comments: {
      type: '[Comment!]',
      args: false,
      resolver: ({ uuid }, args, content, ast) => {
        const feathersParams = convertArgsToFeathers(args, {
          query: { postUuid: uuid, $sort: { uuid: 1 } }
      });
        return options.services.comment.find(feathersParams).then(extractAllItems);
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
