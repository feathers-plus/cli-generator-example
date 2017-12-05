
//!code: imports //!end
//!code: init //!end

let moduleExports = function sqlMetadata(app, options) {
  let { convertArgsToFeathers, convertArgsToOrderBy, convertArgsToWhere } = options;
  let makeOrderBy = convertArgsToOrderBy(options);
  let makeWhere = convertArgsToWhere(options);
  //!code: func_init //!end

  let returns = {
  Comment: {
    sqlTable: "Comments",
    uniqueKey: "uuid",
    fields: {
      authorUuid: {
        sqlColumn: "author_uuid"
      },
      postUuid: {
        sqlColumn: "post_uuid"
      },
      author: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.author_uuid = ' + otherTable + '.uuid'; },
        orderBy(args, content) { return makeOrderBy(args, null); },
        where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); }
      },
      likes: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.comment_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', undefined); }
      }
    }
  },
  Like: {
    sqlTable: "Likes",
    uniqueKey: "uuid",
    fields: {
      authorUuid: {
        sqlColumn: "author_uuid"
      },
      commentUuid: {
        sqlColumn: "comment_uuid"
      },
      author: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.author_uuid = ' + otherTable + '.uuid'; },
        orderBy(args, content) { return makeOrderBy(args, null); },
        where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); }
      },
      comment: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.comment_uuid = ' + otherTable + '.uuid'; },
        orderBy(args, content) { return makeOrderBy(args, null); },
        where(table, args) { return makeWhere(table, args, 'comment_uuid', undefined); }
      }
    }
  },
  Post: {
    sqlTable: "Posts",
    uniqueKey: "uuid",
    fields: {
      authorUuid: {
        sqlColumn: "author_uuid"
      },
      author: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.author_uuid = ' + otherTable + '.uuid'; },
        orderBy(args, content) { return makeOrderBy(args, null); },
        where(table, args) { return makeWhere(table, args, 'author_uuid', undefined); }
      },
      comments: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.post_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', undefined); }
      }
    }
  },
  Relationship: {
    sqlTable: "Relationships",
    uniqueKey: "uuid",
    fields: {
      followeeUuid: {
        sqlColumn: "followee_uuid"
      },
      followerUuid: {
        sqlColumn: "follower_uuid"
      },
      followee: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.followee_uuid = ' + otherTable + '.uuid'; },
        orderBy(args, content) { return makeOrderBy(args, null); },
        where(table, args) { return makeWhere(table, args, 'followee_uuid', undefined); }
      },
      follower: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.follower_uuid = ' + otherTable + '.uuid'; },
        orderBy(args, content) { return makeOrderBy(args, null); },
        where(table, args) { return makeWhere(table, args, 'follower_uuid', undefined); }
      }
    }
  },
  User: {
    sqlTable: "Accounts",
    uniqueKey: "uuid",
    fields: {
      email: {
        sqlColumn: "email_address"
      },
      firstName: {
        sqlColumn: "first_name"
      },
      lastName: {
        sqlColumn: "last_name"
      },
      comments: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.author_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', undefined); }
      },
      followed_by: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.followee_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: -1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', undefined); }
      },
      following: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.follower_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', undefined); }
      },
      fullName: {
        sqlExpr: (tableName, args) => `${tableName}.first_name || ' ' || ${tableName}.last_name`
      },
      likes: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.author_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', undefined); }
      },
      posts: {
        sqlJoin(ourTable, otherTable) { return ourTable + '.uuid = ' + otherTable + '.author_uuid'; },
        orderBy(args, content) { return makeOrderBy(args, { uuid: 1 }); },
        where(table, args) { return makeWhere(table, args, 'uuid', {"body":{"$ne":"xxx"}}); }
      }
    }
  },
  Query: {
    fields: {
      getComment: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      findComment: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      getLike: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      findLike: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      getPost: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      findPost: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      getRelationship: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      findRelationship: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      getUser: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      },
      findUser: {
        orderBy: (args, content) => makeOrderBy(args, { uuid: 1 }),
        where: (table, args) => makeWhere(table, args, 'uuid')
      }
    }
  }
};

  //!code: func_return //!end
  return returns;
};

//!code: more //!end

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
