
// Configure the Feathers services. (Can be re-generated.)
import { App } from '../app.interface';
import comments from './comments/comments.service';
import likes from './likes/likes.service';
import posts from './posts/posts.service';
import relationships from './relationships/relationships.service';
import users from './users/users.service';

import graphql from './graphql/graphql.service';
// !code: imports // !end
// !code: init // !end

// tslint:disable-next-line no-unused-variable
let moduleExports = function (app: App) {
  app.configure(comments);
  app.configure(likes);
  app.configure(posts);
  app.configure(relationships);
  app.configure(users);

  app.configure(graphql);
  // !code: func_return // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
