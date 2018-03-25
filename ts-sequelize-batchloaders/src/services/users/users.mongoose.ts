
/* tslint:disable:quotemark */
// Defines Mongoose model for service `users`. (Can be re-generated.)
import merge from 'lodash.merge';
// tslint:disable-next-line no-unused-variable
import * as mongoose from 'mongoose';
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    uuid: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: String
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
