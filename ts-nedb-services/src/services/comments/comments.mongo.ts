
/* tslint:disable:quotemark */
// Defines the MongoDB $jsonSchema for service `comments`. (Can be re-generated.)
import merge from 'lodash.merge';
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    bsonType: "object",
    additionalProperties: false,
    properties: {
      _id: {
        a: 1,
        bsonType: "objectId"
      },
      uuid: {
        bsonType: "int"
      },
      authorUuid: {
        bsonType: "int"
      },
      postUuid: {
        bsonType: "int"
      },
      body: {
        description: "body of posting or comment",
        minLength: 1,
        bsonType: "string"
      },
      archived: {
        bsonType: "int"
      }
    },
    required: [
      "uuid",
      "authorUuid"
    ]
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
