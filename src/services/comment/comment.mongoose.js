
/* eslint quotes: 0 */
// Defines Mongoose model for service `comment`. (Can be re-generated.)
const deepMerge = require('deepmerge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
//!code: imports //!end
//!code: init //!end

let moduleExports = deepMerge.all([{},
  //!<DEFAULT> code: model
  {
    uuid: mongoose.Schema.ObjectId,
    authorUuid: mongoose.Schema.ObjectId,
    postUuid: mongoose.Schema.ObjectId,
    body: String,
    archived: Number,
    xx: {
      a: String,
      b: mongoose.Schema.ObjectId
    },
    yy: [
      String
    ]
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
