
// Defines Mongoose model for service `comment`.
const deepMerge = require('deepmerge');
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
    archived: Number
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
