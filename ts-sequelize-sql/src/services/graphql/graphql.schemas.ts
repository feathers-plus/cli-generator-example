
// tslint:disable:no-trailing-whitespace
// Define the combined GraphQL schema. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = `
type Comment {
  id: ID
  uuid: Int!
  authorUuid: Int!
  postUuid: Int
  body: String
  archived: Int
  author: User!
  likes: [Like!]
}
 
type Like {
  id: ID
  uuid: Int
  authorUuid: Int
  commentUuid: Int
  author: User!
  comment: Comment!
}
 
type Post {
  id: ID
  uuid: Int
  authorUuid: Int
  body: String
  draft: Int
  author: User!
  comments: [Comment!]
}
 
type Relationship {
  id: ID
  uuid: Int
  followerUuid: Int
  followeeUuid: Int
  follower: User!
  followee: User!
}
 
type User {
  id: ID
  uuid: Int!
  email: String!
  firstName: String!
  lastName: String!
  password: String
  comments: [Comment!]
  followed_by: [Relationship!]
  following: [Relationship!]
  fullName: String!
  likes: [Like!]
  posts(query: JSON, params: JSON, key: JSON): [Post!]
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

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
