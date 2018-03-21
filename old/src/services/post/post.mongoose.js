
/* eslint quotes: 0 */
// Defines Mongoose model for service `post`. (Can be re-generated.)
const deepMerge = require('deepmerge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
//!code: imports //!end
//!code: init //!end

let moduleExports = deepMerge.all([{},
  //!<DEFAULT> code: model
  {
    uuid: Number,
    authorUuid: Number,
    body: String,
    draft: Number
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
