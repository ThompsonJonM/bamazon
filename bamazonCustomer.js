// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// MySQL connect
var connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazondb',
});

// Connection functions
connection.connect (function(err) {
    if (err) throw err;

    console.log("Connected as " + connection.threadId);
    displayProduct();
});

// Display function
function displayProduct() {
    var query = connection.query(
        function(err, res) {
            if (err) throw err;

        }
    )};