var Sequelize = require("sequelize");

var sequelize = new Sequelize("epicure", "root", "", {
    host: "localhost",
    port: 8080,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle:1000
    }
});

module.exports = sequelize;