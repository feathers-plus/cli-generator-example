
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `comment`. (Can be re-generated.)
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
        bsonType: "integer"
      },
      authorUuid: {
        bsonType: "integer"
      },
      postUuid: {
        bsonType: "integer"
      },
      body: {
        bsonType: "string"
      },
      archived: {
        bsonType: "integer"
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
