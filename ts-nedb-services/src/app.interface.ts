
// Application interface. (Can be re-generated.)
import { Application } from '@feathersjs/express';
import { Comment } from './services/comments/comments.interface';
import { Like } from './services/likes/likes.interface';
import { Post } from './services/posts/posts.interface';
import { Relationship } from './services/relationships/relationships.interface';
import { User } from './services/users/users.interface';
// !code: imports // !end
// !code: init // !end

/*
  You can (but don't need to) specify your services' data types in here.
  If you do, TypeScript can infer the return types of service methods.

  example:

  export type App = Application<{users: User}>;

  app.service('users').get(1).then(user => {
    user = 5; // this won't compile, because user is known to be of type User
  });
 */
export type App = Application<{
  comments: Comment,
  likes: Like,
  posts: Post,
  relationships: Relationship,
  users: User,
  // !code: moduleExports // !end
}>;
// !code: funcs // !end
// !code: end // !end
