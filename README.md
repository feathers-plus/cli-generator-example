# cli-generator-example

> Example Feathers app using the @feathers-plus/graphql adapter to expose a GraphQL endpoint.

## About

This app uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.


## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/cli-generator-example
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Starting the app

Point your browser at `localhost:3030` and you will see this test harness:

![test harness](./docs/test-harness.jpg)

## Database

This app can use either an NeDB or SQLite database, both of which reside in `./data`.

Both databases have the same structure:

![database stucture](./docs/schema.jpg)

and contain the same data:

![database data](./docs/tables.jpg)

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
