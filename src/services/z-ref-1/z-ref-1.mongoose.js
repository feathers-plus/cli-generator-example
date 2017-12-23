
// Defines Mongoose model for service `zRef1`.
const deepMerge = require('deepmerge');
const mongoose = require('mongoose');
//!code: imports //!end
//!code: init //!end

let moduleExports = deepMerge.all([{},
  //!<DEFAULT> code: model
  {
    _id: mongoose.Schema.ObjectId,
    uuid: mongoose.Schema.ObjectId,
    authorUuid: mongoose.Schema.ObjectId,
    postUuid: mongoose.Schema.ObjectId,
    body: String,
    archived: Number,
    email: String
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
