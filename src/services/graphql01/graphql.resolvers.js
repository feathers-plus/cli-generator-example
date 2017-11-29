
module.exports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;

  return {
    Query: {
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser (parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args, {query: {$sort: {uuid: 1}}});
        return options.services.user.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser (parent, args, content, ast) {
        return options.services.user.find().then(extractAllItems);
      },
    },
  };
};