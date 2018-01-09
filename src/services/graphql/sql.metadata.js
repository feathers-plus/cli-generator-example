
// Metadata for forming raw SQL statements for GraphQL. (Can be re-generated.)
//!code: imports //!end
//!code: init //!end

let moduleExports = function sqlMetadata(app, options) {
  let { convertArgsToFeathers, convertArgsToOrderBy, convertArgsToWhere } = options;
  let makeOrderBy = convertArgsToOrderBy(options);
  let makeWhere = convertArgsToWhere(options);
  //!code: func_init //!end

  let returns = {

    Comment: {
      sqlTable: 'Comments',
      uniqueKey: 'uuid',
      fields: {
        authorUuid: {
          sqlColumn: 'author_uuid',
          //!code: fields-Comment-authorUuid //!end
        },
        postUuid: {
          sqlColumn: 'post_uuid',
          //!code: fields-Comment-postUuid //!end
        },

        // author: User!
        author: {
          //!<DEFAULT> code: fields-Comment-author
          sqlJoin(ourTable, otherTable) { return `${ourTable}.author_uuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); },
          //!end
        },

        // likes: [Like!]
        likes: {
          //!<DEFAULT> code: fields-Comment-likes
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.comment_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },
        //!code: fields-Comment //!end
      },
      //!code: type-Comment //!end
    },

    Like: {
      sqlTable: 'Likes',
      uniqueKey: 'uuid',
      fields: {
        authorUuid: {
          sqlColumn: 'author_uuid',
          //!code: fields-Like-authorUuid //!end
        },
        commentUuid: {
          sqlColumn: 'comment_uuid',
          //!code: fields-Like-commentUuid //!end
        },

        // author: User!
        author: {
          //!<DEFAULT> code: fields-Like-author
          sqlJoin(ourTable, otherTable) { return `${ourTable}.author_uuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); },
          //!end
        },

        // comment: Comment!
        comment: {
          //!<DEFAULT> code: fields-Like-comment
          sqlJoin(ourTable, otherTable) { return `${ourTable}.comment_uuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'comment_uuid', undefined); },
          //!end
        },
        //!code: fields-Like //!end
      },
      //!code: type-Like //!end
    },

    Post: {
      sqlTable: 'Posts',
      uniqueKey: 'uuid',
      fields: {
        authorUuid: {
          sqlColumn: 'author_uuid',
          //!code: fields-Post-authorUuid //!end
        },

        // author: User!
        author: {
          //!<DEFAULT> code: fields-Post-author
          sqlJoin(ourTable, otherTable) { return `${ourTable}.author_uuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); },
          //!end
        },

        // comments: [Comment!]
        comments: {
          //!<DEFAULT> code: fields-Post-comments
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.post_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },
        //!code: fields-Post //!end
      },
      //!code: type-Post //!end
    },

    Relationship: {
      sqlTable: 'Relationships',
      uniqueKey: 'uuid',
      fields: {
        followerUuid: {
          sqlColumn: 'follower_uuid',
          //!code: fields-Relationship-followerUuid //!end
        },
        followeeUuid: {
          sqlColumn: 'followee_uuid',
          //!code: fields-Relationship-followeeUuid //!end
        },

        // follower: User!
        follower: {
          //!<DEFAULT> code: fields-Relationship-follower
          sqlJoin(ourTable, otherTable) { return `${ourTable}.follower_uuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'follower_uuid', undefined); },
          //!end
        },

        // followee: User!
        followee: {
          //!<DEFAULT> code: fields-Relationship-followee
          sqlJoin(ourTable, otherTable) { return `${ourTable}.followee_uuid = ${otherTable}.uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'followee_uuid', undefined); },
          //!end
        },
        //!code: fields-Relationship //!end
      },
      //!code: type-Relationship //!end
    },

    User: {
      sqlTable: 'Accounts',
      uniqueKey: 'uuid',
      fields: {
        email: {
          sqlColumn: 'email_address',
          //!code: fields-User-email //!end
        },
        firstName: {
          sqlColumn: 'first_name',
          //!code: fields-User-firstName //!end
        },
        lastName: {
          sqlColumn: 'last_name',
          //!code: fields-User-lastName //!end
        },

        // comments: [Comment!]
        comments: {
          //!<DEFAULT> code: fields-User-comments
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.author_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },

        // followed_by: [Relationship!]
        followed_by: {
          //!<DEFAULT> code: fields-User-followed_by
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.followee_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },

        // following: [Relationship!]
        following: {
          //!<DEFAULT> code: fields-User-following
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.follower_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },

        // fullName: String!
        fullName: {
          //!code: fields-User-fullName-non
          sqlExpr: (tableName, args) => `${tableName}.first_name || ' ' || ${tableName}.last_name`
          //!end
        },

        // likes: [Like!]
        likes: {
          //!<DEFAULT> code: fields-User-likes
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.author_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },

        // posts(query: JSON, params: JSON, key: JSON): [Post!]
        posts: {
          //!<DEFAULT> code: fields-User-posts
          sqlJoin(ourTable, otherTable) { return `${ourTable}.uuid = ${otherTable}.author_uuid`; },
          orderBy(args, content) { return makeOrderBy(args, null); },
          where(table, args) { return makeWhere(table, args, 'uuid', undefined); },
          //!end
        },
        //!code: fields-User //!end
      },
      //!code: type-User //!end
    },

    Query: {
      fields: {

        //!<DEFAULT> code: query-Comment
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
        //!end

        //!<DEFAULT> code: query-Like
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
        //!end

        //!<DEFAULT> code: query-Post
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
        //!end

        //!<DEFAULT> code: query-Relationship
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
        //!end

        //!<DEFAULT> code: query-User
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
        //!end
        //!code: metadata_query_fields //!end
      },
      //!code: metadata_query_more //!end
    },
  //!code: metadata_more //!end
  };

//!code: func_return //!end
return returns;
};

//!code: more //!end

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
