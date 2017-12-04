
// Initializes the `graphql` service on path `/graphql`
const createService = require('@feathers-x/graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const hooks = require('./graphql.hooks');
//!code: imports //!end

//!<DEFAULT> code: schemas
const schemas = require('./graphql.schemas');
// const schemas = mergeTypes([
//   require('./graphql.schemas'),
//   ...
// ]);
//!end

// *** services
/*
//!<DEFAULT> code: metadata
const metadata = require('./graphql.metadata').graphql;
// const metadata = Object.assign({},
//   require('./graphql.metadata').graphql,
//   ...
// );
//!end

//!<DEFAULT> code: resolvers
const resolvers = require('./service.resolvers');
// const resolvers = (app, options) => Object.assign({},
//   require('./service.resolvers')(app, options),
//   ...
// );
//!end
*/

// *** SQL
const { cwd } = require('process');
const { join } = require('path');
const sqlite = require('sqlite');

const resolvers = require('./sql.resolvers');
const sqlJoins = require('./sql.metadata');

const usingSql = true;
const sql = {
  dialect: 'sqlite3',
  openDb: () => {
    console.log('..open sql db', join(cwd(), 'data', 'sqlite3.db'));
    sqlite.open(join(cwd(), 'data', 'sqlite3.db'));
    console.log('..open sql db2', typeof sqlite, Object.keys(sqlite), sqlite);
    return sqlite;
  },
  executeSql: sql => sqlite.all(sql)
    .catch(err => {
      console.log('config/default/executeSql error=', err.message);
      throw err;
    })
};
const { dialect, executeSql, openDb } = sql || {};

let moduleExports = function(){
  const app = this;
  //!code: func_init //!end

  console.log('\n===== configuring graphql service for custom Feathers services resolvers.\n'); // eslint-disable-line

  const options = {
    /* services only
    schemas,
    metadata,
    resolvers,
    */
    // SQL only
    schemas,
    resolvers,
    sqlJoins,
    dialect,
    executeSql,
    openDb,
    logSql: true,
     //
    /* services and SQL
    schemas,
    metadata,
    resolvers: usingSql ? sqlResolvers : serviceResolvers,
    sqlJoins,
    dialect,
    executeSql,
    openDb: usingSql ? openDb : undefined,
    logSql: false,
    */
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
