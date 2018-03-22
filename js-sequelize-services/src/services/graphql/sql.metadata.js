
/* eslint-disable no-unused-vars */
// Metadata for forming raw SQL statements for GraphQL. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = function sqlMetadata(app, options) {
  let { convertArgsToFeathers, convertArgsToOrderBy, convertArgsToWhere } = options;
  let makeOrderBy = convertArgsToOrderBy(options);
  let makeWhere = convertArgsToWhere(options);
  // !code: func_init // !end

  let returns = {

    Comment: {
      sqlTable: 'Comments',
      uniqueKey: 'uuid',
      fields: {

        // author: User!
        author: {
          // !<DEFAULT> code: fields-Comment-author
          sqlJoin(ourTable, otherTable) { return `${ourTable}.authorUuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'authorUuid', undefined); },
          // !end
        },

        // likes: [Like!]
        likes: {
          // !<DEFAULT> code: fields-Comment-likes
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.commentUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },
        // !code: fields-Comment // !end
      },
      // !code: type-Comment // !end
    },

    Like: {
      sqlTable: 'Likes',
      uniqueKey: 'uuid',
      fields: {

        // author: User!
        author: {
          // !<DEFAULT> code: fields-Like-author
          sqlJoin(ourTable, otherTable) { return `${ourTable}.authorUuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'authorUuid', undefined); },
          // !end
        },

        // comment: Comment!
        comment: {
          // !<DEFAULT> code: fields-Like-comment
          sqlJoin(ourTable, otherTable) { return `${ourTable}.commentUuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'commentUuid', undefined); },
          // !end
        },
        // !code: fields-Like // !end
      },
      // !code: type-Like // !end
    },

    Post: {
      sqlTable: 'Posts',
      uniqueKey: 'uuid',
      fields: {

        // author: User!
        author: {
          // !<DEFAULT> code: fields-Post-author
          sqlJoin(ourTable, otherTable) { return `${ourTable}.authorUuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'authorUuid', undefined); },
          // !end
        },

        // comments: [Comment!]
        comments: {
          // !<DEFAULT> code: fields-Post-comments
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.postUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },
        // !code: fields-Post // !end
      },
      // !code: type-Post // !end
    },

    Relationship: {
      sqlTable: 'Relationships',
      uniqueKey: 'uuid',
      fields: {

        // follower: User!
        follower: {
          // !<DEFAULT> code: fields-Relationship-follower
          sqlJoin(ourTable, otherTable) { return `${ourTable}.followerUuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'followerUuid', undefined); },
          // !end
        },

        // followee: User!
        followee: {
          // !<DEFAULT> code: fields-Relationship-followee
          sqlJoin(ourTable, otherTable) { return `${ourTable}.followeeUuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'followeeUuid', undefined); },
          // !end
        },
        // !code: fields-Relationship // !end
      },
      // !code: type-Relationship // !end
    },

    User: {
      sqlTable: 'Accounts',
      uniqueKey: 'uuid',
      fields: {

        // comments: [Comment!]
        comments: {
          // !<DEFAULT> code: fields-User-comments
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.authorUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },

        // followed_by: [Relationship!]
        followed_by: {
          // !<DEFAULT> code: fields-User-followed_by
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.followeeUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },

        // following: [Relationship!]
        following: {
          // !<DEFAULT> code: fields-User-following
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.followerUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },

        // fullName: String!
        fullName: {
          // !code: fields-User-fullName-non
          sqlExpr: (tableName, args) => `${tableName}.first_name || ' ' || ${tableName}.last_name`
          // !end
        },

        // likes: [Like!]
        likes: {
          // !<DEFAULT> code: fields-User-likes
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.authorUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },

        // posts(query: JSON, params: JSON, key: JSON): [Post!]
        posts: {
          // !<DEFAULT> code: fields-User-posts
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.authorUuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          // !end
        },
        // !code: fields-User // !end
      },
      // !code: type-User // !end
    },

    Query: {
      fields: {

        // !<DEFAULT> code: query-Comment
        // getComment(query: JSON, params: JSON, key: JSON): Comment
        getComment: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },

        // findComment(query: JSON, params: JSON): [Comment!]
        findComment: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },
        // !end

        // !<DEFAULT> code: query-Like
        // getLike(query: JSON, params: JSON, key: JSON): Like
        getLike: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },

        // findLike(query: JSON, params: JSON): [Like!]
        findLike: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },
        // !end

        // !<DEFAULT> code: query-Post
        // getPost(query: JSON, params: JSON, key: JSON): Post
        getPost: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },

        // findPost(query: JSON, params: JSON): [Post!]
        findPost: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },
        // !end

        // !<DEFAULT> code: query-Relationship
        // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
        getRelationship: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },

        // findRelationship(query: JSON, params: JSON): [Relationship!]
        findRelationship: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },
        // !end

        // !<DEFAULT> code: query-User
        // getUser(query: JSON, params: JSON, key: JSON): User
        getUser: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },

        // findUser(query: JSON, params: JSON): [User!]
        findUser: {
          orderBy: (args, content) => makeOrderBy(args, { uuid : 1 }),
          where: (table, args) => makeWhere(table, args, 'uuid'),
        },
        // !end
        // !code: metadata_query_fields // !end
      },
      // !code: metadata_query_more // !end
    },
  // !code: metadata_more // !end
  };

  // !code: func_return // !end
  return returns;
};

// !code: more // !end

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
