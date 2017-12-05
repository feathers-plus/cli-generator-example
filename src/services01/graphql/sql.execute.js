
const { cwd } = require('process');
const { join } = require('path');
//!code: imports //!end
//!code: init //!end

//!code: main
const sqlite = require('sqlite')
let dialect = 'sqlite3';

let openDb = () => {
  sqlite.open(join(cwd(), 'data', 'sqlite3.db'));
  return sqlite;
};

let executeSql = sql => sqlite.all(sql)
  .catch(err => {
    console.log('config/default/executeSql error=', err.message);
    throw err;
  });
//!end

let moduleExports = {
  dialect,
  executeSql,
  openDb,
  //!code: moduleExports //!end
};

//!code: more //!end

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end
