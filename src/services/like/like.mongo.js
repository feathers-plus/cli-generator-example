
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `like`. (Can be re-generated.)
const deepMerge = require('deepmerge');
//!code: imports //!end
//!code: init //!end

let moduleExports = deepMerge.all([{},
  //!<DEFAULT> code: model
  {
    bsonType: "object",
    required: [],
    properties: {
      uuid: {
        bsonType: "string"
      },
      authorUuid: {
        bsonType: "string"
      },
      commentUuid: {
        bsonType: "string"
      }
    }
  },
  //!end
  //!code: moduleExports //!end
]);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
