
// Initializes the `graphql` service on path `/graphql`. (Can be re-generated.)
const createService = require('@feathers-plus/graphql');
const merge = require('lodash.merge');
const { mergeTypes } = require('merge-graphql-schemas');
const generatedSchema = require('./graphql.schemas');
const generatedResolvers = require('./sql.resolvers');
const generatedMetadata = require('./sql.metadata');
const sqlExecute = require('./sql.execute.sequelize');
const hooks = require('./graphql.hooks');
// !code: imports // !end

const strategy = 'sql';
// eslint-disable-next-line no-console
console.log(`\n===== configuring graphql service for ${strategy}.\n`);

let schemas = mergeTypes([
  generatedSchema,
  // !code: schemas // !end
]);

let resolvers = (app, options) => merge({},
  generatedResolvers(app, options),
  // !code: sql_resolvers // !end
);

let sqlJoins = (app, options) => merge({},
  generatedMetadata(app, options),
  // !code: sql_metadata // !end
);

// !code: init // !end

let moduleExports = function () {
  const app = this;
  let { dialect, executeSql, openDb } = sqlExecute(app);

  if (!dialect) {
    throw new Error('services/graphql/sql.execute.js has not been configured.');
  }

  // !code: func_init // !end

  let options = {
    schemas,
    resolvers,
    sqlJoins,
    dialect,
    executeSql,
    openDb,
    logSql: false,
  };
  // !code: func_options // !end

  // Initialize our service with any options it requires.
  const createdService = createService(options);
  app.use('/graphql', createdService);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/graphql');

  service.hooks(hooks);
  service.executeSql = executeSql;
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

/*
Stash code not used now but which may be used if the module is regenerated.
// !code: service_resolvers // !end
// !code: batchloader_resolvers // !end
*/
