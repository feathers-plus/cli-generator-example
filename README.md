# graphql-examples

> Example apps using feathers-plus/graphql

## Installation

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Change the directory to the example you want to run, e.g.
   ```text
   cd graphql-examples/js-nedb-services
   ```
3. Install your dependencies
    ```
    npm install
    ``` 
4. Start the app
    ```
    npm start
    ```

## Starting the app

Its assumed your browser can access the server on `localhost:3030`.
You can change the URL in `graphql-examples/example-name/public/serverUrl.js` if necessary.

Point your browser at `localhost:3030` and you will see this test harness:

![test harness](./docs/test-harness.jpg)

## Ten examples

This repo contains several example FeathersJS applications using GraphQL Query
via the feathers-plus/graphql adapter.

The examples all use the same data set,
and the same frontend client for testing.
Each example is available in both JavaScript and TypeScript.

The examples differ in the database being used and in how the Query is resolved.
We've chosen representative databases which require no installation.

### non-SQL DB

Two examples use the [NeDB](https://github.com/louischatriot/nedb) database.
They differ in how they resolve the GraphQL query:
- Feathers services only are used in examples js-nedb-service and ts-nedb-services.
- Feathers services with [batch-loaders](https://feathers-plus.github.io/v1/batch-loader/)
are used in examples js-nedb-batchloaders and ts-nedb-batchloaders.

These examples will work without any GraphQL related changes for
[MongoDB](https://www.mongodb.com/) and [Mongoose](http://mongoosejs.com/).

### SQL DB

The [Sequelize](http://docs.sequelizejs.com/) ORM supports multiple SQL databases.
Three examples use it with the [SQLite](https://sqlite.org/cli.html) database.
They also differ in how they resolve the GraphQL query:
- Feathers services only are used in examples js-sequelize-service and ts-sequelize-services.
- Feathers services with [batch-loaders](https://feathers-plus.github.io/v1/batch-loader/)
are used in examples js-sequelize-batchloaders and ts-sequelize-batchloaders.
- Raw SQL statements are generated in examples js-sequelize-sql and ts-sequelize-sql.

These examples will work without any GraphQL related changes for
PostgreSQL, MySQL, and MSSQL.
They would also work with the [Knex](https://github.com/kripod/knex-orm) ORM.

### Different GraphQL resolvers

The 5 examples (both in .js and .ts flavors) differ in how they implement their
GraphQL resolvers.

#### FeathersJS services alone

When FeathersJS services alone are used, each resolver makes its own service call.
This is the simplest way to set up resolvers,
but it also generates the most service calls.

#### FeathersJS services are used with batch-loaders

A cache is automatically created for each resolver when
FeathersJS services are used with [batch-loaders](https://feathers-plus.github.io/v1/batch-loader/).
The same record is only read once.

The resolver requests are also batched.
Just one service call is made for several resolver calls.

Batch-loaders may also be shared among resolvers.
The same batch-loader, for example, may be used by resolvers needing the Users table.
This further reduces the number of service calls as one cache is shared,
and service calls for different resolvers may be satisfied together in one service call.

It is more complex to set up batch-loader resolvers than ones using just FeathersJS services,
batch-loaders may typically reduce the number of service calls by a factor of 10,
e.g. 2 calls instead of 20.

#### Using raw SQL statements

[Join-monster](https://join-monster.readthedocs.io/en/latest/)
is a query planner between GraphQL and SQL for the Node.js graphql-js reference implementation.
It's a function that takes a GraphQL query and dynamically translates GraphQL to SQL for efficient,
batched data retrieval before resolution.
It fetches only the data you need - nothing more, nothing less.

Setting up resolvers for `join-monster` is more complex than the previous 2 methods.
The results will be significantly faster than using FeathersJS services alone.
The results may be usefully faster than using batch-loaders,
depending on the Query and on the data set,

## Database

This app can use either an NeDB or SQLite database, both of which reside in `./data`.

Both databases have the same structure:

![database stucture](./docs/schema.jpg)

and contain the same data:

![database data](./docs/tables.jpg)

## Scaffolding


## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
