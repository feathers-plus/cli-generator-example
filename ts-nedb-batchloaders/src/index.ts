
/* tslint:disable no-console */
// Start the server. (Can be re-generated.)
import * as logger from 'winston';
import app from './app';
// !code: imports
// tslint:disable-next-line
const initDb = require('../test-helpers/init-db');
// tslint:disable-next-line
const testGraphql = require('./test-graphql');
// !end
// !code: init // !end

const port = app.get('port');
const server = app.listen(port);
// !code: init2 // !end

process.on('unhandledRejection', (reason, p) => {
  // !<DEFAULT> code: unhandled_rejection_log
  logger.error('Unhandled Rejection at: Promise ', p, reason);
  // !end
  // !code: unhandled_rejection // !end
});

server.on('listening', () => {
  // !code: listening_log
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
  // !end
  // !code: listening
  setTimeout(() => { //
    initDb(app)
      .then(() => testGraphql(app))
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });
  }, 1000);
  // !end
});

// !code: funcs // !end
// !code: end

// !end
