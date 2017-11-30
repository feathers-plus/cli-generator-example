
//!code: imports //!end
//!code: init //!end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;

  return {
    User: {
      // fullName: String!
      fullName: (parent, args, context, ast) => `${parent.firstName} ${parent.lastName}`,
    },

    //!code: resolver_type_more //!end

    Query: {
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.user.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser(parent, args, content, info) {
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
