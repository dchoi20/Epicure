var Sequelize = require("sequelize");

var sequelize = require(".config/connection.js");

var Submission = sequelize.define("submission", {
    routeName: Sequelize.STRING,

    firstName: Sequelize.STRING,

    lastName: Sequelize.STRING,

    country: Sequelize.STRING,

    subject: Sequelize.STRING
}, {
    freezeTableName: true
});

Submission.sync();

module.exports = Submission;