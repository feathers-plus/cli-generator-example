
const { getByDot, setByDot } = require('feathers-hooks-common');
//!code: imports //!end
//!code: init //!end

let moduleExports = function serviceResolvers(app, options) {
  let { convertArgsToParams, convertArgsToFeathers, extractAllItems, extractFirstItem, // eslint-disable-line
    feathersDataLoader: { feathersDataLoader } } = options;
  //!location: resolvers-header

  //!<DEFAULT> code: services
  const comment = app.service('/comment');
  const like = app.service('/like');
  const post = app.service('/post');
  const relationship = app.service('/relationship');
  const user = app.service('/user');
  //!end

  /*
  const context = {
    app: this._app,
    dataLoaders: {
      shareable: {},
      nonShareable: {},
      persisted: this.persistedDataLoaders
    },
    batchLoadersCreated: undefined,
  };
  */

  /*
   Organizing BatchLoaders by their characteristics provides clarity and helps avoid coding errors.
   'unshared' is for transient BatchLoaders used by just one resolver.
   'shared' is for transient BatchLoaders used by one or more resolvers.
   'persisted' is for BatchLoaders that persist between GraphQL calls.
   The 'one' objects are for BatchLoaders returning one object.
   The 'set' objects are for BatchLoaders returning an array of objects.

   Transient BatchLoaders can be created only once (one of) its resolver has been called,
   because the BatchLoader loading function may require data from the 'args' passed to the resolver.
   It should be noted that a resolver's 'args' are static throughout a GraphQL call.
  */

  function getBatchLoader(dataLoaderName, parent, args, content, ast) {
    let dl = getByDot(content, dataLoaderName);
    let feathersParams;

    if (!dl) {

      switch (dataLoaderName) {
        // Transient BatchLoaders shared among several resolvers.
        case 'dataLoaders.user.shared.one.uuid':
          feathersParams = convertArgsToFeathers(args);

          dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
            keys => {
              feathersParams.query.uuid = {$in: keys};
              console.log('Execute user.find(', feathersParams, ');');
              return user.find(feathersParams);
            },
            50
          );
          break;

        // Transient BatchLoaders used by only one resolver.
        case 'dataLoaders.like.unshared.set.commentUuid_$uuid':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: 1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'commentUuid',
            keys => {
              feathersParams.query.commentUuid = {$in: keys};
              console.log('Execute like.find(', feathersParams, ');');
              return like.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.comment.unshared.one.uuid':
          feathersParams = convertArgsToFeathers(args);

          dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
            keys => {
              feathersParams.query.uuid = {$in: keys};
              console.log('Execute comment.find(', feathersParams, ');');
              return comment.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.comment.unshared.set.postUuid_$uuid':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: 1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'postUuid',
            keys => {
              feathersParams.query.postUuid = {$in: keys};
              console.log('Execute comment.find(', feathersParams, ');');
              //!location: resolvers-Comment-author-keys-return
              return comment.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.comment.unshared.set.authorUuid_$uuid':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: 1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'authorUuid',
            keys => {
              feathersParams.query.authorUuid = {$in: keys};
              console.log('Execute comment.find(', feathersParams, ');');
              return comment.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.relationship.unshared.set.followeeUuid_$uuid_desc':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: -1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'followeeUuid',
            keys => {
              feathersParams.query.followeeUuid = {$in: keys};
              console.log('Execute relationship.find(', feathersParams, ');');
              return relationship.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.relationship.unshared.set.followerUuid_$uuid':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: 1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'followerUuid',
            keys => {
              feathersParams.query.followerUuid = {$in: keys};
              console.log('Execute relationship.find(', feathersParams, ');');
              return relationship.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.like.unshared.set.authorUuid_$uuid':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: 1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'authorUuid',
            keys => {
              feathersParams.query.authorUuid = {$in: keys};
              console.log('Execute like.find(', feathersParams, ');');
              return like.find(feathersParams);
            }
          );
          break;
        case 'dataLoaders.post.unshared.set.authorUuid_$uuid':
          feathersParams = convertArgsToFeathers(args, [
            { query : { $sort: { uuid: 1 } } },
          ]);

          dl = feathersDataLoader(dataLoaderName, '[!]', 'authorUuid',
            keys => {
              feathersParams.query.authorUuid = {$in: keys};
              console.log('Execute post.find(', feathersParams, ');');
              return post.find(feathersParams);
            }
          );
          break;
        default:
          throw new Error(`GraphQL query requires BatchLoader named '${dataLoaderName}' but no definition exists for it.`);
      }

      if (dl) {
        setByDot(content, dataLoaderName, dl);
      }
    }

    return dl;
  }

  let returns = {

    Comment: {

      // author: User!
      author:
        //!code: resolver-Comment-author
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.user.shared.one.uuid', parent, args, content, ast);
          return dl.load(parent.authorUuid);
        },
        //!end

      // likes: [Like!]
      likes:
        //!code: resolver-Comment-likes
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.like.unshared.set.commentUuid_$uuid', parent, args, content, ast);
          return dl.load(parent.uuid);
        },
        //!end
    },

    Like: {

      // author: User!
      author:
        //!code: resolver-Like-author
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.user.shared.one.uuid', parent, args, content, ast);
          return dl.load(parent.authorUuid);
        },
        //!end

      // comment: Comment!
      comment:
        //!code: resolver-Like-comment
        (parent , args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.comment.unshared.one.uuid', parent, args, content, ast);
          return dl.load(parent.commentUuid);
        },
        //!end
    },

    Post: {

      // author: User!
      author:
        //!code: resolver-Post-author
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.user.shared.one.uuid', parent, args, content, ast);
          return dl.load(parent.authorUuid);
        },
        //!end

      // comments: [Comment!]
      comments:
        //!code: resolver-Post-comments
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.comment.unshared.set.postUuid_$uuid', parent, args, content, ast);
          return dl.load(parent.uuid);
        },
        //!end
    },

    Relationship: {

      // followee: User!
      followee:
        //!code: resolver-Relationship-followee
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.user.shared.one.uuid', parent, args, content, ast);
          return dl.load(parent.followeeUuid);
        },
        //!end

      // follower: User!
      follower:
        //!code: resolver-Relationship-follower
        (parent , args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.user.shared.one.uuid', parent, args, content, ast);
          return dl.load(parent.followerUuid);
        },
        //!end
    },

    User: {

      // comments: [Comment!]
      comments:
        //!code: resolver-User-comments
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.comment.unshared.set.authorUuid_$uuid', parent, args, content, ast);
          return dl.load(parent.uuid);
        },
        //!end

      // followed_by: [Relationship!]
      followed_by:
        //!code: resolver-User-followed_by
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.relationship.unshared.set.followeeUuid_$uuid_desc', parent, args, content, ast);
          return dl.load(parent.uuid);
        },
        //!end

      // following: [Relationship!]
      following:
        //!code: resolver-User-following
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.relationship.unshared.set.followerUuid_$uuid', parent, args, content, ast);
          return dl.load(parent.uuid);
        },
        //!end

      // fullName: String!
      fullName:
        //!code: resolver-User-fullName-non
        ({ firstName, lastName }, args, context, ast) => `${firstName} ${lastName}`,
        //!end

      // likes: [Like!]
      likes:
        //!code: resolver-User-likes
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.like.unshared.set.authorUuid_$uuid', parent, args, content, ast);
          return dl.load(parent.uuid);
        },
        //!end

      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      posts:
        //!code: resolver-User-posts
        (parent, args, content, ast) => {
          let dl = getBatchLoader('dataLoaders.post.unshared.set.authorUuid_$uuid', parent, args, content, ast);
          return dl.load(parent.uuid);
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
