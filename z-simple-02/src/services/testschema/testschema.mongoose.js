
// Defines Mongoose model for service `testschema`.
const deepMerge = require('deepmerge');
const mongoose = require('mongoose');
//!code: imports //!end
//!code: init //!end

let moduleExports = deepMerge.all([{},
  //!<DEFAULT> code: model
  {
    str1: {
      required: true,
      type: String,
      match: "^[0-9]+$"
    },
    str2: String,
    int1: {
      type: Number,
      min: 13,
      max: 110
    },
    array1: [
      Number
    ],
    uuid: {
      required: true,
      type: mongoose.Schema.ObjectId
    }
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
