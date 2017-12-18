
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

  let returns = {

    Comment: {

      // author: User!
      author:
        //!<DEFAULT> code: resolver-Comment-author
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.authorUuid }, paginate: false
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // likes: [Like!]
      likes:
        //!<DEFAULT> code: resolver-Comment-likes
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { commentUuid: parent.uuid, $sort: { commentUuid: 1 } }, paginate: false
          });
          return like.find(feathersParams).then(extractAllItems);
        },
        //!end
    },

    Like: {

      // author: User!
      author:
        //!<DEFAULT> code: resolver-Like-author
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.authorUuid }, paginate: false
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // comment: Comment!
      comment:
        //!<DEFAULT> code: resolver-Like-comment
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.commentUuid }, paginate: false
          });
          return comment.find(feathersParams).then(extractFirstItem);
        },
        //!end
    },

    Post: {

      // author: User!
      author:
        //!<DEFAULT> code: resolver-Post-author
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.authorUuid }, paginate: false
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // comments: [Comment!]
      comments:
        //!<DEFAULT> code: resolver-Post-comments
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { postUuid: parent.uuid, $sort: { postUuid: 1 } }, paginate: false
          });
          return comment.find(feathersParams).then(extractAllItems);
        },
        //!end
    },

    Relationship: {

      // followee: User!
      followee:
        //!<DEFAULT> code: resolver-Relationship-followee
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.followeeUuid }, paginate: false
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end

      // follower: User!
      follower:
        //!<DEFAULT> code: resolver-Relationship-follower
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.followerUuid }, paginate: false
          });
          return user.find(feathersParams).then(extractFirstItem);
        },
        //!end
    },

    User: {

      // comments: [Comment!]
      comments:
        //!<DEFAULT> code: resolver-User-comments
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: parent.uuid, $sort: { authorUuid: 1 } }, paginate: false
          });
          return comment.find(feathersParams).then(extractAllItems);
        },
        //!end

      // followed_by: [Relationship!]
      followed_by:
        //!<DEFAULT> code: resolver-User-followed_by
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followeeUuid: parent.uuid, $sort: { followeeUuid: 1 } }, paginate: false
          });
          return relationship.find(feathersParams).then(extractAllItems);
        },
        //!end

      // following: [Relationship!]
      following:
        //!<DEFAULT> code: resolver-User-following
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followerUuid: parent.uuid, $sort: { followerUuid: 1 } }, paginate: false
          });
          return relationship.find(feathersParams).then(extractAllItems);
        },
        //!end

      // fullName: String!
      fullName:
        //!code: resolver-User-fullName-non
        (parent, args, content, ast) => `${parent.firstName} ${parent.lastName}`,
        //!end

      // likes: [Like!]
      likes:
        //!<DEFAULT> code: resolver-User-likes
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: parent.uuid, $sort: { authorUuid: 1 } }, paginate: false
          });
          return like.find(feathersParams).then(extractAllItems);
        },
        //!end

      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      posts:
        //!code: resolver-User-posts
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: parent.uuid, $sort: { authorUuid: 1, uuid: 1 } }, paginate: false
          });
          return post.find(feathersParams).then(extractAllItems);
        },
        //!end
    },

    //!code: resolver_field_more //!end

    Query: {

      //!<DEFAULT> code: query-Comment
      // getComment(query: JSON, params: JSON, key: JSON): Comment
      getComment (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return comment.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findComment(query: JSON, params: JSON): [Comment!]
      findComment(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return comment.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Like
      // getLike(query: JSON, params: JSON, key: JSON): Like
      getLike (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return like.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findLike(query: JSON, params: JSON): [Like!]
      findLike(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return like.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Post
      // getPost(query: JSON, params: JSON, key: JSON): Post
      getPost (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return post.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findPost(query: JSON, params: JSON): [Post!]
      findPost(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return post.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Relationship
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return relationship.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findRelationship(query: JSON, params: JSON): [Relationship!]
      findRelationship(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"uuid":1} } });
        return relationship.find(feathersParams).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser (parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args);
        return user.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser(parent, args, content, info) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {"id":1} } });
        return user.find(feathersParams).then(extractAllItems);
      },
      //!end
      //!code: resolver_query_more //!end
    },
  };

  //!code: func_return //!end
  return returns;
};

//!code: more //!end

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
