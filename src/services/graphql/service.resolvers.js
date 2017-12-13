
//!code: imports //!end
//!code: init //!end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;

  //!<DEFAULT> code: services
  const comment = app.service('/comment');
  const like = app.service('/like');
  const post = app.service('/post');
  const relationship = app.service('/relationship');
  const user = app.service('/user');
  //!end

  return {

    Comment: {

      // author: User!
      author:
        //!code: resolver-Comment-author
        ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return user.find(feathersParams).then(extractFirstItem)
        },
        //!end

      // likes: [Like!]
      likes:
        //!code: resolver-Comment-likes
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { commentUuid: uuid, $sort: { uuid: 1 } }
          });
          return like.find(feathersParams).then(extractAllItems);
        },
        //!end
    },

    Like: {

      // author: User!
      author:
        //!code: resolver-Like-author
        ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // comment: Comment!
      comment:
        //!code: resolver-Like-comment
        ({ commentUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: commentUuid, $sort: { uuid: 1 } }
          });
          return comment.find(feathersParams).then(extractFirstItem);
        },
        //!end
    },

    Post: {

      // author: User!
      author:
        //!code: resolver-Post-author
        ({ authorUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: authorUuid, $sort: { uuid: 1 } }
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // comments: [Comment!]
      comments:
        //!code: resolver-Post-comments
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { postUuid: uuid, $sort: { uuid: 1 } }
          });
          return comment.find(feathersParams).then(extractAllItems);
        },
        //!end
    },

    Relationship: {

      // followee: User!
      followee:
        //!code: resolver-Relationship-followee
        ({ followeeUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: followeeUuid, $sort: { uuid: 1 } }
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // follower: User!
      follower:
        //!code: resolver-Relationship-follower
        ({ followerUuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: followerUuid, $sort: { uuid: 1 } }
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end
    },

    User: {

      // comments: [Comment!]
      comments:
        //!code: resolver-User-comments
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: uuid, $sort: { uuid: 1 } }
          });
          return comment.find(feathersParams).then(extractAllItems);
        },
        //!end

      // followed_by: [Relationship!]
      followed_by:
        //!code: resolver-User-followed_by
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followeeUuid: uuid, $sort: { uuid: 1 } }
          });
          return relationship.find(feathersParams).then(extractAllItems);
        },
        //!end

      // following: [Relationship!]
      following:
        //!code: resolver-User-following
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followerUuid: uuid, $sort: { uuid: 1 } }
          });
          return relationship.find(feathersParams).then(extractAllItems);
        },
        //!end

      // fullName: String!
      fullName:
        //!<DEFAULT> code: resolver-User-fullName-non
        (parent, args, content, ast) => {},
        //!end

      // likes: [Like!]
      likes:
        //!code: resolver-User-likes
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: {authorUuid: uuid, $sort: {uuid: 1}}
          });
          return like.find(feathersParams).then(extractAllItems);
        },
        //!end

      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      posts:
        //!code: resolver-User-posts
        ({ uuid }, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: uuid, $sort: { uuid: 1 } }
          });
          return post.find(feathersParams).then(extractAllItems);
        }
        //!end
    },

    //!code: resolver_field_more //!end

    Query: {

      //!<DEFAULT> code: query-Comment
      // getComment(query: JSON, params: JSON, key: JSON): Comment
      getComment (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.comment.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findComment(query: JSON, params: JSON): [Comment!]
      findComment(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.comment.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Like
      // getLike(query: JSON, params: JSON, key: JSON): Like
      getLike (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.like.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findLike(query: JSON, params: JSON): [Like!]
      findLike(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.like.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Post
      // getPost(query: JSON, params: JSON, key: JSON): Post
      getPost (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.post.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findPost(query: JSON, params: JSON): [Post!]
      findPost(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.post.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Relationship
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.relationship.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findRelationship(query: JSON, params: JSON): [Relationship!]
      findRelationship(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return options.services.relationship.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return options.services.user.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"id":1} } });
        return options.services.user.find(feathersParams).then(extractAllItems);
      },
      //!end
      //!code: resolver_query_more //!end
    },
  };
};

//!code: more //!end

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
