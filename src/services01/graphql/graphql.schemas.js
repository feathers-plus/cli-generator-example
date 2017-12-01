
//!code: imports //!end
//!code: init //!end

let moduleExports = `
type Comment {
  
}
 
type Like {
  id: ID
  _id: ID
  uuid: ID
  authorUuid: ID
  commentUuid: ID
  author: User!
  comment: Comment!
}
 
type Post {
  id: ID
  _id: ID
  uuid: ID
  authorUuid: ID
  body: String
  draft: Int
  author: User!
  comments: [Comment!]
}
 
type Relationship {
  id: ID
  _id: ID
  uuid: ID
  followerUuid: ID
  followeeUuid: ID
  follower: User!
  followee: User!
}
 
type User {
  id: ID
  _id: ID
  uuid: ID!
  email: String!
  firstName: String!
  lastName: String!
  fullName: String!
  posts(query: JSON, params: JSON, key: JSON): [Post!]
  comments: [Comment!]
  followed_by: [Relationship!]
  following: [Relationship!]
  likes: [Like!]
}
 

type Query {
  getComment(key: JSON, query: JSON, params: JSON): Comment
  findComment(query: JSON, params: JSON): [Comment]!
  getLike(key: JSON, query: JSON, params: JSON): Like
  findLike(query: JSON, params: JSON): [Like]!
  getPost(key: JSON, query: JSON, params: JSON): Post
  findPost(query: JSON, params: JSON): [Post]!
  getRelationship(key: JSON, query: JSON, params: JSON): Relationship
  findRelationship(query: JSON, params: JSON): [Relationship]!
  getUser(key: JSON, query: JSON, params: JSON): User
  findUser(query: JSON, params: JSON): [User]!
}
`;

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
