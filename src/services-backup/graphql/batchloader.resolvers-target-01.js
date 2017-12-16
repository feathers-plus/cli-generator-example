
const { getByDot, setByDot } = require('feathers-hooks-common');
//!code: imports //!end
//!code: init //!end

let moduleExports = function batchloaderResolvers(app, options) {
  let { convertArgsToParams, convertArgsToFeathers, extractAllItems, extractFirstItem, // eslint-disable-line
    feathersDataLoader: { feathersDataLoader } } = options;

  const feathersBatchLoader = feathersDataLoader;
  //!location: resolvers-header

  //!<DEFAULT> code: services
  const comment = app.service('/comment');
  const like = app.service('/like');
  const post = app.service('/post');
  const relationship = app.service('/relationship');
  const user = app.service('/user');
  //!end

  //!<DEFAULT> code: get-result
  // Given a fieldName in the parent record, return the result from a BatchLoader
  // The result will be an object, an array of objects, or null.
  function getResult(batchLoaderName, fieldName) {
    const contentByDot = `batchLoaders.${batchLoaderName}`;

    // `content.app = app` is the Feathers app object.
    // `content.batchLoaders = {}` is where the BatchLoaders for a request are stored.
    return (parent, args, content, ast) => {
      let batchLoader = getByDot(content, contentByDot);

      if (!batchLoader) {
        batchLoader = getBatchLoader(batchLoaderName, parent, args, content, ast);
        setByDot(content, contentByDot, batchLoader);
      }

      return batchLoader.load(parent[fieldName]);
    }
  }
  //!end

  // A transient BatchLoader can be created only when (one of) its resolver has been called,
  // as the BatchLoader loading function may require data from the 'args' passed to the resolver.
  // Note that each resolver's 'args' are static throughout a GraphQL call.
  function getBatchLoader(dataLoaderName, parent, args, content, ast) {
    let feathersParams;

    switch (dataLoaderName) {
      //!<DEFAULT> code: bl-persisted
      /* Persistent BatchLoaders. Stored in 'content.batchLoaders._persisted'. */

      // case '_persisted.___XXX___':
      //!end

      //!code: bl-shared
      /* Transient BatchLoaders shared among resolvers. Stored in 'content.batchLoaders._shared'. */

      // *.*: User
      case '_shared.user.one.uuid':
        return feathersBatchLoader(dataLoaderName, '!', 'uuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { uuid: { $in: keys } } }
            );
            return user.find(feathersParams);
          },
          50
        );
      //!end

      /* Transient BatchLoaders used by only one resolver. Stored in 'content.batchLoaders'. */

      // Comment.likes: [Like!]
      //!code: bl-Comment-likes
      case 'Comment.likes':
        return feathersBatchLoader(dataLoaderName, '[!]', 'commentUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { commentUuid: { $in: keys }, $sort: { uuid: 1 } } },
            );
            return like.find(feathersParams);
          }
        );
      //!end

      // Posts.comments: [Comment!]
      //!code: bl-Posts-comments
      case 'Post.comments':
        return feathersBatchLoader(dataLoaderName, '[!]', 'postUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { postUuid: { $in: keys }, $sort: { uuid: 1 } } },
            );
            return comment.find(feathersParams);
          }
        );
      //!end

      // Like.comment: Comment!
      //!code: bl-Like-comment
      case 'Like.comment':
        return feathersBatchLoader(dataLoaderName, '!', 'uuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { uuid: { $in: keys } } }
            );
            return comment.find(feathersParams);
          }
        );
      //!end

      // User.comments: [Comment!]
      //!code: bl-User-comments
      case 'User.comments':
        return feathersBatchLoader(dataLoaderName, '[!]', 'authorUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { authorUuid: { $in: keys }, $sort: { uuid: 1 } } },
            );
            return comment.find(feathersParams);
          }
        );

      // User.followed_by: [Relationship!]
      //!code: bl-User-followed
      case 'User.followed_by':
        return feathersBatchLoader(dataLoaderName, '[!]', 'followeeUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { followeeUuid: { $in: keys }, $sort: { uuid: -1 } } },
            );
            return relationship.find(feathersParams);
          }
        );
      //!end

      // User.following: [Relationship!]
      //!code: bl-User-following
      case 'User.following':
        return feathersBatchLoader(dataLoaderName, '[!]', 'followerUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { followerUuid: { $in: keys }, $sort: { uuid: 1 } } },
            );
            return relationship.find(feathersParams);
          }
        );
      //!end

      // User.likes: [Like!]
      //!code: bl-User-likes
      case 'User.likes':
        return feathersBatchLoader(dataLoaderName, '[!]', 'authorUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { authorUuid: { $in: keys }, $sort: { uuid: 1 } } },
            );
            return like.find(feathersParams);
          }
        );
      //!end

      // User.posts(query: JSON, params: JSON, key: JSON): [Post!]
      //!code: bl-User-posts
      case 'User.posts':
        return feathersBatchLoader(dataLoaderName, '[!]', 'authorUuid',
          keys => {
            feathersParams = convertArgsToFeathers(args,
              { query : { authorUuid: { $in: keys }, $sort: { uuid: 1 } } },
            );
            return post.find(feathersParams);
          }
        );
      //!end

      /* Throw on unknown BatchLoader name. */

      default:
      //!<DEFAULT> code: bl-default
        throw new Error(`GraphQL query requires BatchLoader named '${dataLoaderName}' but no definition exists for it.`);
      //!end
    }
  }

  let returns = {

    Comment: {

      // author: User!
      //!code: resolver-Comment-author
      author: getResult('_shared.user.one.uuid', 'authorUuid'),
      //!end

      // likes: [Like!]
      //!code: resolver-Comment-likes
      likes: getResult('Comment.likes', 'uuid'),
      //!end
    },

    Like: {

      // author: User!
      //!code: resolver-Like-author
      author: getResult('_shared.user.one.uuid', 'authorUuid'),
      //!end

      // comment: Comment!
      //!code: resolver-Like-comment
      comment: getResult('Like.comment', 'commentUuid'),
      //!end
    },

    Post: {

      // author: User!
      //!code: resolver-Post-author
      author: getResult('_shared.user.one.uuid', 'authorUuid'),
      //!end

      // comments: [Comment!]
      //!code: resolver-Post-comments
      comments: getResult('Post.comments', 'uuid'),
      //!end
    },

    Relationship: {

      // followee: User!
      //!code: resolver-Relationship-followee
      followee: getResult('_shared.user.one.uuid', 'followeeUuid'),
      //!end

      // follower: User!
      //!code: resolver-Relationship-follower
      follower: getResult('_shared.user.one.uuid', 'followerUuid'),
      //!end
    },

    User: {

      // comments: [Comment!]
      //!code: resolver-User-comments
      comments: getResult('User.comments', 'uuid'),
      //!end

      // followed_by: [Relationship!]
      //!code: resolver-User-followed_by
      followed_by: getResult('User.followed_by', 'uuid'),
      //!end

      // following: [Relationship!]
      //!code: resolver-User-following
      following: getResult('User.following', 'uuid'),
      //!end

      // fullName: String!
      //!code: resolver-User-fullName-non
      fullName: ({ firstName, lastName }, args, context, ast) => `${firstName} ${lastName}`,
      //!end

      // likes: [Like!]
      //!code: resolver-User-likes
      likes: getResult('User.likes', 'uuid'),
      //!end

      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      //!code: resolver-User-posts
      posts: getResult('User.posts', 'uuid'),
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
