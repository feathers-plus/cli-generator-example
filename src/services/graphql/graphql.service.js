
// Initializes the `graphql` service on path `/graphql`
const createService = require('@feathers-plus/graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const deepMerge = require('deepmerge');
const generatedSchema = require('./graphql.schemas');
const generatedResolvers = require('./sql.resolvers');
const generatedMetadata = require('./sql.metadata');
const { dialect, executeSql, openDb } = require('./sql.execute');
const hooks = require('./graphql.hooks');
//!code: imports //!end

const strategy = 'sql';
console.log(`\n===== configuring graphql service for ${strategy}.\n`);

let schemas = mergeTypes([
  generatedSchema,
  //!code: schemas //!end
]);

let resolvers = (app, options) => deepMerge.all([{},
  generatedResolvers(app, options),
  //!code: sql_resolvers
// sql_r
//!end
]);

let sqlJoins = (app, options) => deepMerge.all([{},
  generatedMetadata(app, options),
  //!code: sql_metadata
// sql_m
//!end
]);

if (!dialect) {
  throw new Error('services/graphql/sql.execute.js has not been configured.');
}
//!code: init //!end

let moduleExports = function(){
  const app = this;
  //!code: func_init //!end

  let options = {
    schemas,
    resolvers,
    sqlJoins,
    dialect,
    executeSql,
    openDb,
    logSql: false,
  };
  //!code: func_options //!end

  // Initialize our service with any options it requires.
  const createdService = createService(options);
  app.use('/graphql', createdService);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/graphql');

  service.hooks(hooks);
  //!code: func_return //!end
};

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end

/*
Stash code not used now but which may be used if the module is regenerated.
//!code: service_resolvers
  // service_resolvers
  //!end
//!code: batchloader_resolvers
// bl_r
//!end
*/
