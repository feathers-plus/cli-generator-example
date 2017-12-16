
// Initializes the `graphql` service on path `/graphql`
const createService = require('@feathers-x/graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const hooks = require('./graphql.hooks');
//!code: imports //!end

const strategy = 'sql';
console.log(`\n===== configuring graphql service for ${strategy}.\n`);

const schemas = mergeTypes([
  require('./graphql.schemas'),
  //!code: schemas //!end
]);

// Setup for using SQL statements.
const { dialect, executeSql, openDb } = require('./sql.execute');
if (!dialect) {
  throw new Error('services/graphql/sql.execute.js has not been configured.');
}

const sqlResolvers = (app, options) => Object.assign({},
  require('./sql.resolvers')(app, options),
  //!code: sql_resolvers
// sql_r
//!end
);

const sqlJoins = (app, options) => Object.assign({},
  require('./sql.metadata')(app, options),
  //!code: sql_metadata
// sql_m
//!end
);
//!code: init //!end

let moduleExports = function(){
  const app = this;
  //!code: func_init //!end

  const options = {
    schemas,
    resolvers: sqlResolvers,
    sqlJoins,
    dialect,
    executeSql,
    openDb,
    logSql: false,
    //!code: func_options //!end
  };

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
Stash custom code perhaps not used here but which may be used if the module is regenerated.
//!code: service_resolvers
  // service_resolvers
  //!end
//!code: batchloader_resolvers
// bl_r
//!end
//!code: sql_resolvers
// sql_r
//!end
//!code: sql_metadata
// sql_m
//!end
*/