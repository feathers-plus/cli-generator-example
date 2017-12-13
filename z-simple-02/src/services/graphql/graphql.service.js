
// Initializes the `graphql` service on path `/graphql`
const createService = require('@feathers-x/graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const hooks = require('./graphql.hooks');
//!code: imports //!end

const schemas = mergeTypes([
  require('./graphql.schemas'),
  //!code: schemas //!end
]);

// Setup for using Feathers service resolvers.

const serviceResolvers = (app, options) => Object.assign({},
  require('./service.resolvers')(app, options),
  //!code: service_resolvers //!end
);

const metadata = Object.assign({},
  require('./service.metadata').graphql,
  //!code: service_metadata //!end
);

// Setup for using SQL statement resolvers.

const { dialect, executeSql, openDb } = require('./sql.execute');
if (!dialect) {
  throw new Error('services/graphql/sql.execute.js has not been configured.');
}

const sqlResolvers = (app, options) => Object.assign({},
  require('./sql.resolvers')(app, options),
  //!code: sql_resolvers //!end
);

const sqlJoins = (app, options) => Object.assign({},
  require('./sql.metadata')(app, options),
  //!code: sql_metadata //!end
);

let moduleExports = function(){
  const app = this;

  // Setup for using both Feathers service and SQL statement resolvers.
  //!<DEFAULT> code: use_either
  const usingSql = true;
  //!end
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
