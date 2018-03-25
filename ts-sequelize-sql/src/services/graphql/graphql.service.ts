
// Initializes the `graphql` service on path `/graphql`. (Can be re-generated.)
import { App } from '../../app.interface';

import createService from '@feathers-plus/graphql';
import merge from 'lodash.merge';
import { mergeTypes } from 'merge-graphql-schemas';
import generatedSchema from './graphql.schemas';
import generatedResolvers, { SqlResolverFactoryOptions } from './sql.resolvers';
import generatedMetadata, { SqlMetadataOptions } from './sql.metadata';
import sqlExecute from './sql.execute.sequelize';
import hooks from './graphql.hooks';
// !code: imports // !end

const strategy = 'sql';
// tslint:disable-next-line no-console
console.log(`\n===== configuring graphql service for ${strategy}.\n`);

let schemas = mergeTypes([
  generatedSchema,
  // !code: schemas // !end
]);

let resolvers = (app: App, options: SqlResolverFactoryOptions) => merge({},
  generatedResolvers(app, options),
  // !code: sql_resolvers // !end
);

let sqlJoins = (app: App, options: SqlMetadataOptions) => merge({},
  generatedMetadata(app, options),
  // !code: sql_metadata // !end
);

// !code: init // !end

let moduleExports = function (app: App) {
  let { dialect, executeSql, openDb } = sqlExecute(app);

  if (!dialect) {
    throw new Error('services/graphql/sql.execute.ts has not been configured.');
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
  // !code: func_return // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end

/*
Stash code not used now but which may be used if the module is regenerated.
// !code: service_resolvers // !end
// !code: batchloader_resolvers // !end
*/
