
/* eslint-disable no-unused-vars, indent */
// Define GraphQL resolvers using only Feathers services. (Can be re-generated.)
//!code: imports
const resolversAst = require('graphql-resolvers-ast');
//!end
//!code: init //!end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;

  //!<DEFAULT> code: services
  let comment = app.service('/comment');
  let like = app.service('/like');
  let post = app.service('/post');
  let relationship = app.service('/relationship');
  let user = app.service('/user');
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
          return user.find(feathersParams)
            .then(paginations(content, ast)).then(extractFirstItem);
        },
        //!end

      // likes: [Like!]
      likes:
        //!<DEFAULT> code: resolver-Comment-likes
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { commentUuid: parent.uuid, $sort: undefined }, paginate: false
          });
          return like.find(feathersParams)
            .then(paginations(content, ast)).then(extractAllItems);
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
          return user.find(feathersParams)
            .then(paginations(content, ast)).then(extractFirstItem);
        },
        //!end

      // comment: Comment!
      comment:
        //!<DEFAULT> code: resolver-Like-comment
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.commentUuid }, paginate: false
          });
          return comment.find(feathersParams)
            .then(paginations(content, ast)).then(extractFirstItem);
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
          return user.find(feathersParams)
            .then(paginations(content, ast)).then(extractFirstItem);
        },
        //!end

      // comments: [Comment!]
      comments:
        //!<DEFAULT> code: resolver-Post-comments
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { postUuid: parent.uuid, $sort: undefined }, paginate: false
          });
          return comment.find(feathersParams)
            .then(paginations(content, ast)).then(extractAllItems);
        },
        //!end
    },

    Relationship: {

      // follower: User!
      follower:
        //!<DEFAULT> code: resolver-Relationship-follower
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.followerUuid }, paginate: false
          });
          return user.find(feathersParams)
            .then(paginations(content, ast)).then(extractFirstItem);
        },
        //!end

      // followee: User!
      followee:
        //!<DEFAULT> code: resolver-Relationship-followee
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { uuid: parent.followeeUuid }, paginate: false
          });
          return user.find(feathersParams)
            .then(paginations(content, ast)).then(extractFirstItem);
        },
        //!end
    },

    User: {

      // comments: [Comment!]
      comments:
        //!<DEFAULT> code: resolver-User-comments
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: parent.uuid, $sort: undefined }, paginate: false
          });
          return comment.find(feathersParams)
            .then(paginations(content, ast)).then(extractAllItems);
        },
        //!end

      // followed_by: [Relationship!]
      followed_by:
        //!<DEFAULT> code: resolver-User-followed_by
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followeeUuid: parent.uuid, $sort: undefined }, paginate: false
          });
          return relationship.find(feathersParams)
            .then(paginations(content, ast)).then(extractAllItems);
        },
        //!end

      // following: [Relationship!]
      following:
        //!<DEFAULT> code: resolver-User-following
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { followerUuid: parent.uuid, $sort: undefined }, paginate: false
          });
          return relationship.find(feathersParams)
            .then(paginations(content, ast)).then(extractAllItems);
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
            query: { authorUuid: parent.uuid, $sort: undefined }, paginate: false
          });
          return like.find(feathersParams)
            .then(paginations(content, ast)).then(extractAllItems);
        },
        //!end

      // posts(query: JSON, params: JSON, key: JSON): [Post!]
      posts:
        //!<DEFAULT> code: resolver-User-posts
        (parent, args, content, ast) => {
          const feathersParams = convertArgsToFeathers(args, {
            query: { authorUuid: parent.uuid, $sort: undefined } /*, paginate: false */
          });
          return post.find(feathersParams)
            .then(paginations(content, ast, 'user.posts')).then(extractAllItems);
        },
        //!end
    },

    //!code: resolver_field_more //!end

    Query: {

      //!<DEFAULT> code: query-Comment
      // getComment(query: JSON, params: JSON, key: JSON): Comment
      getComment (parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args);
        return comment.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findComment(query: JSON, params: JSON): [Comment!]
      findComment(parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {   uuid: 1 } } });
        return comment.find(feathersParams)
          .then(paginations(content, ast)).then(paginate(content)).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Like
      // getLike(query: JSON, params: JSON, key: JSON): Like
      getLike (parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args);
        return like.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findLike(query: JSON, params: JSON): [Like!]
      findLike(parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {   uuid: 1 } } });
        return like.find(feathersParams)
          .then(paginations(content, ast)).then(paginate(content)).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Post
      // getPost(query: JSON, params: JSON, key: JSON): Post
      getPost (parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args);
        return post.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findPost(query: JSON, params: JSON): [Post!]
      findPost(parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {   uuid: 1 } } });
        return post.find(feathersParams)
          .then(paginations(content, ast)).then(paginate(content)).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-Relationship
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship (parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args);
        return relationship.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findRelationship(query: JSON, params: JSON): [Relationship!]
      findRelationship(parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {   uuid: 1 } } });
        return relationship.find(feathersParams)
          .then(paginations(content, ast)).then(paginate(content)).then(extractAllItems);
      },
      //!end

      //!<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser (parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args);
        return user.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser(parent, args, content, ast) {
        const feathersParams = convertArgsToFeathers(args, { query: { $sort: {   uuid: 1 } } });
        return user.find(feathersParams)
          .then(paginations(content, ast)).then(paginate(content)).then(extractAllItems);
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

function paginate(content) {
  return result => {
    content.pagination = !result.data ? undefined : {
      total: result.total,
      limit: result.limit,
      skip: result.skip,
    };

    return result;
  };
}
//!code: funcs
function paginations(content, ast, who) {
  return result => {
    if (!result.data) return result;

    content.paginations = content.paginations || [];
    const parsedAst = resolversAst(ast);
    console.log(parsedAst.resolverPath);

    content.paginations.push({
      resolverPath: parsedAst.resolverPath,
      args: parsedAst.args,
      pagination: {
        total: result.total,
        limit: result.limit,
        skip: result.skip,
      }
    });

    return result;
  };
}
//!end
//!code: end //!end
