
//!code: imports //!end
//!code: init //!end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;

  return {
        Userxxx: {
      fullName: (parent, args, info, ast) => null,
      supervisor: (parent, args, info, ast) => null,    },

    //!code: resolver_type_more //!end

    Query: {
      // getUserxxx(query: JSON, params: JSON, key: JSON): Userxxx
      getUserxxx(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args$);
        return options.services.user.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUserxxx(query: JSON, params: JSON): [Userxxx!]
      findUserxxx(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"id":1} } });
        return options.services.user.find(feathersParams).then(extractAllItems);
      },
      //!code: resolver_query_more //!end
    },
  };
};

//!code: more //!end

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
