
//!code: imports //!end
//!code: init //!end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;

  return {
    Comment: {
      // author: User!
      author: ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem)
        },
      // likes: [Like!]
      likes: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { commentUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.like.find(feathersParams).then(extractAllItems);
        },
    },
    Like: {
      // author: User!
      author: ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
        },
      // comment: Comment!
      comment: ({ commentUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: commentUuid, $sort: { uuid: 1 } }
          });
          return options.services.comment.find(feathersParams).then(extractFirstItem);
        },
    },
    Post: {
      // author: User!
      author: ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
        },
      // comments: [Comment!]
      comments: ({ uuid }, args, content, ast) => {
        const feathersParams = convertArgsToFeathers(args, {
          query: { postUuid: uuid, $sort: { uuid: 1 } }
      });
        return options.services.comment.find(feathersParams).then(extractAllItems);
      },
    },
    Relationship: {
      // follower: User!
      follower: ({ followerUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: followerUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
        },
      // followee: User!
      followee: ({ followeeUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: followeeUuid, $sort: { uuid: 1 } }
          });
          return options.services.user.find(feathersParams).then(extractFirstItem);
        },
    },
    User: {
      // fullName: String!
      fullName: ({ firstName, lastName }, args, context, ast) => `${firstName} ${lastName}`,
      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      posts: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.post.find(feathersParams).then(extractAllItems);
        },
      // comments: [Comment!]
      comments: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.comment.find(feathersParams).then(extractAllItems);
        },
      // followed_by: [Relationship!]
      followed_by: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followeeUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.relationship.find(feathersParams).then(extractAllItems);
        },
      // following: [Relationship!]
      following: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followerUuid: uuid, $sort: { uuid: 1 } }
          });
          return options.services.relationship.find(feathersParams).then(extractAllItems);
        },
      // likes: [Like!]
      likes: ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: {authorUuid: uuid, $sort: {uuid: 1}}
          });
          return options.services.like.find(feathersParams).then(extractAllItems);
        },
    },

    //!code: resolver_type_more //!end

    Query: {
      // getComment(query: JSON, params: JSON, key: JSON): Comment
      getComment(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.comment.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findComment(query: JSON, params: JSON): [Comment!]
      findComment(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.comment.find(feathersParams).then(extractAllItems);
      },
      // getLike(query: JSON, params: JSON, key: JSON): Like
      getLike(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.like.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findLike(query: JSON, params: JSON): [Like!]
      findLike(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.like.find(feathersParams).then(extractAllItems);
      },
      // getPost(query: JSON, params: JSON, key: JSON): Post
      getPost(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.post.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findPost(query: JSON, params: JSON): [Post!]
      findPost(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.post.find(feathersParams).then(extractAllItems);
      },
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.relationship.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findRelationship(query: JSON, params: JSON): [Relationship!]
      findRelationship(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.relationship.find(feathersParams).then(extractAllItems);
      },
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
