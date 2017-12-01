
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
    //!default code: extension_header
    name: 'Like',
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
      comment: {
        type: 'Comment!',
        args: false,
        resolver: ({ commentUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: commentUuid, $sort: { uuid: 1 } }
          });
          return options.services.comment.find(feathersParams).then(extractFirstItem);
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
