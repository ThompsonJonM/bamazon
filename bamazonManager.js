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
    bamazonManager();
});

function bamazonManager() {
    inquirer.prompt([
        {
            name: 'choose',
            type: 'list',
            message: 'Manager Interface',
            choices: ['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }
    ]).then(function(user) {
        console.log(user.choose);
        switch(user.choose) {
            case 'View Products':
                viewProducts(function() {
                    bamazonManager();
                });
            break;

            case 'View Low Inventory':
                viewLowInventory(function() {
                    bamazonManager();
                });
            break;

            case 'Add to Inventory':
                addInventoryy();
            break;

            case 'Add New Product':
                addProduct();
            break;

            case 'Exit':
                connection.end();
            break;
        }
    });
}