
//!code: imports //!end
//!code: init //!end

let schema = {
  $schema: 'http://json-schema.org/draft-05/schema',
  //!<DEFAULT> code: schema_header
  title: '...',
  description: '...',
  //!end
  type: 'object',
  required: [
    //!code: schema_required //!end
  ],
  properties: {
    //!code: schema_properties //!end
  },
  //!code: schema_more //!end
};

let extension = {
  graphql: {
    //!<DEFAULT> code: extension_header
    // name: '...',
    // service : {
    //   sort: { id: 1 },
    // },
    //!end
    discard: [
      //!code: extension_discard //!end
    ],
    add: {
      //!<DEFAULT> code: extension_add
      // ???: {
      //   type: 'User!',
      //   args: false,
      //   service: {
      //     resolver: (parent, args, content, ast) => {
      //       const feathersParams = convertArgsToFeathers(args, {
      //         query: { ???: ???, $sort: { ???: 1 } }
      //       });
      //       return options.services.???.find(feathersParams).then(extractFirstItem);
      //       return options.services.???.find(feathersParams).then(extractAllItems);
      //     },
      //   },
      // },
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
