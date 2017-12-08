
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const makeDebug = require('debug');

const debug = (...args) => console.log(...args);

const { getResultsByKey, getUniqueKeys } = BatchLoader;

module.exports = function (app) {

  const persistentLoaders = {};

  const loaders = context => Object.assign({}, persistentLoaders, {
    user: {
      id: new BatchLoader(async (keys, context) => {
          debug('.loaders.user.id', keys)
          const result = await app.service('user').find(
            makeCallingParams(context, {uuid: {$in: getUniqueKeys(keys)}})
          );
          return getResultsByKey(keys, result, user => user.uuid, '!');
        },
        {context}
      )
    },
    comments: {
      postId: new BatchLoader(async (keys, context) => {
          debug('.loaders.comments.postId', keys)
          const result = await app.service('comment').find(
            makeCallingParams(context, {postId: {$in: getUniqueKeys(keys)}})
          );
          return getResultsByKey(keys, result, comment => comment.postId, '[!]');
        },
        {context}
      )
    },
  });

  /*
  const commentResolvers = {
    joins: {
      author: () => async (comment, context) => !comment.authorUuid ? null :
        comment.author = await context._loaders.user.uuid.load(comment.authorUuid),

      likes: () => async (comment, context) =>
        comment.likes = await context._loaders.like.uuid.loadMany(comment.id || comment._id),
    },
  };
  */

  const user = {
    before: context => {
      console.log('\n.user..before');
      context._loaders = loaders(context);
    },
    joins: {
      fullName: () => {
        console.log('\n.user..joins..fullName..resolver');
        return (user, context) => {
          console.log('\n.user..joins..fullName..resolver..inner', user);
          user.fullName = `${user.firstName} ${user.lastName}`;
          return user;
        }
      },
    },
  };

  const post = {
    before: context => {
      console.log('\n.post..before');
      context._loaders = loaders(context);
    },
    joins: {
      author: {
        resolver: () => {
          console.log('\n.post..joins..author..resolver');
          return async (post, context) => {
            console.log('\n.post..joins..author..resolver..inner', post.authorUuid);
            post.author = await context._loaders.user.id.load(post.authorUuid);
            return post.author;
          }
        },
        joins: user,
      },

      starers: () => async (post, context) => {
        return !post.starIds ? null :
          post.starers = await context._loaders.user.id.loadMany(post.starIds);
      },
      /*
      reputation_author: () => async (post, context) => {
        if (!post.reputation) return null;
        const authors = await context._loaders.user.id.loadMany(post.reputation.map(rep => rep.userId));
        post.reputation.forEach((rep, i) => { rep.author = authors[i].name; });
      },

      comments: {
        resolver: (...args) => async (post, context) =>
          post.commentRecords = await context._loaders.comments.postId.load(post.id),
        joins: commentResolvers,
      },
      */
    }
  };

  return {
    post,
    user,
  };
}
