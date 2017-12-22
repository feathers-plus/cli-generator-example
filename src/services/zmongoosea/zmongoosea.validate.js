
// Validation definitions for validateSchema hook for service `zmongoosea`.
const { validateSchema } = require('@feathers-plus/feathers-hooks-common');
const deepMerge = require('deepmerge');
const ajv = require('ajv');
//!code: imports //!end
//!code: init //!end

//!<DEFAULT> code: set_id_type
const ID = 'string';
//!end

const base = deepMerge.all([{},
  //!<DEFAULT> code: base
  {
    $schema: "http://json-schema.org/draft-05/schema",
    title: "Testa",
    description: "Testa database.",
    required: [
      "_id",
      "twitter"
    ],
    properties: {
      _id: {
        type: ID
      },
      name: {
        required: [
          "firstName"
        ],
        properties: {
          firstName: {
            type: "string"
          },
          lastName: {
            type: "string"
          }
        },
        type: "object"
      },
      biography: {
        type: "string"
      },
      twitter: {
        type: "string"
      },
      facebook: {
        type: "string"
      },
      linkedin: {
        type: "string"
      },
      created: {
        type: "date"
      }
    }
  },
  //!end
  //!code: base_more //!end
]);

const create = deepMerge.all([{},
  base,
  //!code: create_more //!end
]);

const update = deepMerge.all([{},
  base,
  //!code: update_more //!end
]);

const patch = deepMerge.all([{},
  base,
  { required: undefined },
  //!code: patch_more //!end
]);

const validateCreate = options => {
  //!<DEFAULT> code: func_create
  return validateSchema(create, ajv, options);
  //!end
};

const validateUpdate = options => {
//!<DEFAULT> code: func_update
  return validateSchema(update, ajv, options);
  //!end
};

const validatePatch = options => {
//!<DEFAULT> code: func_patch
  return validateSchema(patch, ajv, options);
  //!end
};

let moduleExports = {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
  //!code: moduleExports //!end
};

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
