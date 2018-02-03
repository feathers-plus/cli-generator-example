
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
        bsonType: "string"
      },
      authorUuid: {
        bsonType: "string"
      },
      postUuid: {
        bsonType: "string"
      },
      body: {
        bsonType: "string"
      },
      archived: {
        bsonType: "integer"
      },
      xx: {
        bsonType: "object",
        required: undefined,
        properties: {
          a: {
            bsonType: "string"
          },
          b: {
            bsonType: "string"
          }
        }
      },
      yy: {
        bsonType: "array"
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
