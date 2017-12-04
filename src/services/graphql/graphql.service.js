
// Initializes the `graphql` service on path `/graphql`
const createService = require('@feathers-x/graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const hooks = require('./graphql.hooks');
//!code: imports //!end

//!<DEFAULT> code: schemas
const schemas = require('./graphql.schemas');
// const schemas = mergeTypes([
//   require('./graphql.schemas'),
//   // other schemas
// ]);
//!end

// Setup for using Feathers service resolvers.

//!<DEFAULT> code: service_resolvers
const serviceResolvers = require('./service.resolvers');
// const serviceResolvers = (app, options) => Object.assign({},
//   require('./service.resolvers')(app, options),
//   // other service resolvers
// );
//!end

//!<DEFAULT> code: service_metadata
const metadata = require('./graphql.metadata').graphql;
// const metadata = Object.assign({},
//   require('./graphql.metadata').graphql,
//   // other service metadata
// );
//!end

// Setup for using SQL statement resolvers.

const { dialect, executeSql, openDb } = require('./sql.execute');
//!<DEFAULT> code: sql_resolvers
const sqlResolvers = require('./sql.resolvers');;
// const sqlResolvers = Object.assign({},
//   require('./sql.resolvers'),
//   // other sql resolvers
// );
//!end

//!<DEFAULT> code: service_metadata
const sqlJoins = require('./sql.metadata');
// const sqlJoins = Object.assign({},
//   require('./sql.metadata'),
//   // other sql metadata
// );
//!end

if (!dialect) {
  throw new Error('services/graphql/sql.execute.js has not been configured.');
}

// Setup for both Feathers service and SQL statement resolvers.
  
//!<DEFAULT> code: service_either
const usingSql = false;
//!end

let moduleExports = function(){
  const app = this;
  //!code: func_init //!end

  console.log('\n===== configuring graphql service for custom Feathers services resolvers.\n'); // eslint-disable-line

  const options = {
    schemas,
    metadata,
    resolvers: usingSql ? sqlResolvers : serviceResolvers,
    sqlJoins,
    dialect,
    executeSql,
    openDb: usingSql ? openDb : undefined,
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
