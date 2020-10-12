// Requirements
const util = require("util");
const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    // Your port from MYSQL
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: process.env.MYSQLPW,
    // Primary Database
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;