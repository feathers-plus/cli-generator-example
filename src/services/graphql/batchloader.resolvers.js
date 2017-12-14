
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

  let returns = {

    Comment: {

      // author: User!
      author:
        //!code: resolver-Comment-author
        ({ authorUuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.user.shared.one.uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
              keys => {
                feathersParams.query.uuid = {$in: keys};
                console.log('Execute user.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return user.find(feathersParams);
              },
              50
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(authorUuid);
        },
        //!end

      // likes: [Like!]
      likes:
        //!code: resolver-Comment-likes
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.like.shared.set.commentUuid_uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: 1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'commentUuid',
              keys => {
                feathersParams.query.commentUuid = {$in: keys};
                console.log('Execute like.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return like.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
        },
        //!end
    },

    Like: {

      // author: User!
      author:
        //!code: resolver-Like-author
        ({ authorUuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.user.shared.one.uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
              keys => {
                feathersParams.query.uuid = {$in: keys};
                console.log('Execute user.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return user.find(feathersParams);
              },
              100
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(authorUuid);
        },
        //!end

      // comment: Comment!
      comment:
        //!code: resolver-Like-comment
        ({  commentUuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.user.shared.one.commentUuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
              keys => {
                feathersParams.query.uuid = {$in: keys};
                console.log('Execute comment.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return comment.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load( commentUuid);
        },
        //!end
    },

    Post: {

      // author: User!
      author:
        //!code: resolver-Post-author
        ({ authorUuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.user.shared.one.uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
              keys => {
                feathersParams.query.uuid = {$in: keys};
                console.log('Execute user.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return user.find(feathersParams);
              },
              50
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(authorUuid);
        },
        //!end

      // comments: [Comment!]
      comments:
        //!code: resolver-Post-comments
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.comment.shared.set.postUuid_uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: 1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'postUuid',
              keys => {
                feathersParams.query.commentUuid = {$in: keys};
                console.log('Execute comment.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return comment.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
        },
        //!end
    },

    Relationship: {

      // followee: User!
      followee:
        //!code: resolver-Relationship-followee
        ({ followeeUuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.user.shared.one.uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
              keys => {
                feathersParams.query.uuid = {$in: keys};
                console.log('Execute user.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return user.find(feathersParams);
              },
              50
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(followeeUuid);
        },
        //!end

      // follower: User!
      follower:
        //!code: resolver-Relationship-follower
        ({ followerUuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.user.shared.one.uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '!', 'uuid',
              keys => {
                feathersParams.query.uuid = {$in: keys};
                console.log('Execute user.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return user.find(feathersParams);
              },
              100
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(followerUuid);
        },
        //!end
    },

    User: {

      // comments: [Comment!]
      comments:
        //!code: resolver-User-comments
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.comment.shared.set.authorUuid_$uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: 1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'authorUuid',
              keys => {
                feathersParams.query.authorUuid = {$in: keys};
                console.log('Execute comment.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return comment.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
        },
        //!end

      // followed_by: [Relationship!]
      followed_by:
        //!code: resolver-User-followed_by
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.relationship.shared.set.followeeUuid_$uuid_desc';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: -1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'followeeUuid',
              keys => {
                feathersParams.query.followeeUuid = {$in: keys};
                console.log('Execute relationship.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return relationship.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
        },
        //!end

      // following: [Relationship!]
      following:
        //!code: resolver-User-following
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.relationship.shared.set.followerUuid_$uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: 1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'followeeUuid',
              keys => {
                feathersParams.query.followerUuid = {$in: keys};
                console.log('Execute relationship.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return relationship.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
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
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.like.shared.set.authorUuid_$uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: 1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'authorUuid',
              keys => {
                feathersParams.query.followerUuid = {$in: keys};
                console.log('Execute like.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return like.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
        },
        //!end

      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      posts:
        //!code: resolver-User-posts
        ({ uuid }, args, content, ast) => {
          const dataLoaderName = 'dataLoaders.post.unshared.set.authorUuid_$uuid';
          let dl = getByDot(content, dataLoaderName);

          if (!dl) {
            let feathersParams = convertArgsToFeathers(args, [
              { query : { $sort: { uuid: 1 } } },
            ]);
            //!location: resolvers-Comment-author-params

            dl = feathersDataLoader(dataLoaderName, '[!]', 'authorUuid',
              keys => {
                feathersParams.query.followerUuid = {$in: keys};
                console.log('Execute post.find(', feathersParams, ');');
                //!location: resolvers-Comment-author-keys-return
                return post.find(feathersParams);
              }
            );
            setByDot(content, dataLoaderName, dl)
          }

          //!location: resolvers-Comment-author-result
          return dl.load(uuid);
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
