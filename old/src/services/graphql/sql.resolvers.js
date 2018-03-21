
/* eslint-disable no-unused-vars */
// Define GraphQL resolvers for forming raw SQL statements. (Can be re-generated.)
//!code: imports //!end
//!code: init //!end

let moduleExports = function sqlResolvers(app, options) {
  let { dialect, executeSql, genAndRunSql } = options;
  let genRunSql = genAndRunSql(executeSql, { dialect }, options);

  const returns = {
    //!code: resolver_field_more //!end

    Query: {

      //!<DEFAULT> code: query-Comment
      // getComment(query: JSON, params: JSON, key: JSON): Comment
      getComment: (parent, args, content, ast) => genRunSql(content, ast),

      // findComment(query: JSON, params: JSON, key: JSON): [Comment!]
      findComment: (parent, args, content, ast) => genRunSql(content, ast),
      //!end

      //!<DEFAULT> code: query-Like
      // getLike(query: JSON, params: JSON, key: JSON): Like
      getLike: (parent, args, content, ast) => genRunSql(content, ast),

      // findLike(query: JSON, params: JSON, key: JSON): [Like!]
      findLike: (parent, args, content, ast) => genRunSql(content, ast),
      //!end

      //!<DEFAULT> code: query-Post
      // getPost(query: JSON, params: JSON, key: JSON): Post
      getPost: (parent, args, content, ast) => genRunSql(content, ast),

      // findPost(query: JSON, params: JSON, key: JSON): [Post!]
      findPost: (parent, args, content, ast) => genRunSql(content, ast),
      //!end

      //!<DEFAULT> code: query-Relationship
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship: (parent, args, content, ast) => genRunSql(content, ast),

      // findRelationship(query: JSON, params: JSON, key: JSON): [Relationship!]
      findRelationship: (parent, args, content, ast) => genRunSql(content, ast),
      //!end

      //!<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser: (parent, args, content, ast) => genRunSql(content, ast),

      // findUser(query: JSON, params: JSON, key: JSON): [User!]
      findUser: (parent, args, content, ast) => genRunSql(content, ast),
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
