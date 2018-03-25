
/* tslint:disable:quotemark */
// Defines Mongoose model for service `comments`. (Can be re-generated.)
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
    authorUuid: {
      type: Number,
      required: true
    },
    postUuid: Number,
    body: String,
    archived: Number
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
