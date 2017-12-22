
// Defines Mongoose model for service `zmongoosea`.
const deepMerge = require('deepmerge');
const mongoose = require('mongoose');
//!code: imports //!end
//!code: init //!end

let moduleExports = deepMerge.all([{},
  //!<DEFAULT> code: model
  {
    _id: mongoose.Schema.ObjectId,
    name: {
      firstName: String,
      lastName: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    created: Date
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
