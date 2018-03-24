
/* eslint quotes: 0 */
// Defines Sequelize model for service `comments`. (Can be re-generated.)
const merge = require('lodash.merge');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes;
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    id: {
      description: "unique identifier",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    authorUuid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postUuid: {
      type: DataTypes.INTEGER
    },
    body: {
      description: "body of posting or comment",
      type: DataTypes.TEXT
    },
    archived: {
      type: DataTypes.INTEGER
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
