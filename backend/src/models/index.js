const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const config = require("../shared/config");
const basename = path.basename(__filename);
// require('custom-env').env();
const dbHost = config.dbHost;
const dbName = config.dbName;
const userName = config.dbUserName;
const password = config.dbPassword || '';
const dbPort = config.dbPort;

const sequelize = new Sequelize(
  `mysql://${userName}:${password}@${dbHost}:${dbPort}/${dbName}`
);

// // CONNECT TO DB
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection has been established successfully`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    // logger.debug(`model.name: ${model.name}`);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
