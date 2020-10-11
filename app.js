// Requirements
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 9000,
    // Your username
    user: "root",
    // Your password
    password: process.env.MYSQLPW,
    // Primary Database
    database: "wizard_schools_db"
});


connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});