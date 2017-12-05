
//!code: imports //!end
//!code: init //!end

let graphql = {
  Comment: {
    service: "comment",
    path: "/comment"
  },
  Like: {
    service: "like",
    path: "/like"
  },
  Post: {
    service: "post",
    path: "/post"
  },
  Relationship: {
    service: "relationship",
    path: "/relationship"
  },
  User: {
    service: "user",
    path: "/user"
  }
};

let feathers = {
  comment: {
    graphql: "Comment",
    path: "/comment"
  },
  like: {
    graphql: "Like",
    path: "/like"
  },
  post: {
    graphql: "Post",
    path: "/post"
  },
  relationship: {
    graphql: "Relationship",
    path: "/relationship"
  },
  user: {
    graphql: "User",
    path: "/user"
  }
};

//!code: more //!end

let moduleExports = {
  graphql,
  feathers,
  //!code: moduleExports //!end
};

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
