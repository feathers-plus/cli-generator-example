
//!code: imports //!end
//!code: init //!end

let moduleExports = function sqlResolvers(app, options) {
  let { dialect, executeSql, genAndRunSql } = options;
  let genRunSql = genAndRunSql(executeSql, { dialect }, options);

  return {
    //!code: resolver_field_more //!end

    Query: {

      //!<DEFAULT> code: query-Comment
      // getComment(query: JSON, params: JSON, key: JSON): Comment
      getComment: (parent, args, content, info) => genRunSql(content, info),

      // findComment(query: JSON, params: JSON, key: JSON): [Comment!]
      findComment: (parent, args, content, info) => genRunSql(content, info),
      //!end

      //!<DEFAULT> code: query-Like
      // getLike(query: JSON, params: JSON, key: JSON): Like
      getLike: (parent, args, content, info) => genRunSql(content, info),

      // findLike(query: JSON, params: JSON, key: JSON): [Like!]
      findLike: (parent, args, content, info) => genRunSql(content, info),
      //!end

      //!<DEFAULT> code: query-Post
      // getPost(query: JSON, params: JSON, key: JSON): Post
      getPost: (parent, args, content, info) => genRunSql(content, info),

      // findPost(query: JSON, params: JSON, key: JSON): [Post!]
      findPost: (parent, args, content, info) => genRunSql(content, info),
      //!end

      //!<DEFAULT> code: query-Relationship
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship: (parent, args, content, info) => genRunSql(content, info),

      // findRelationship(query: JSON, params: JSON, key: JSON): [Relationship!]
      findRelationship: (parent, args, content, info) => genRunSql(content, info),
      //!end

      //!<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser: (parent, args, content, info) => genRunSql(content, info),

      // findUser(query: JSON, params: JSON, key: JSON): [User!]
      findUser: (parent, args, content, info) => genRunSql(content, info),
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
