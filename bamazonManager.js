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
            choices: ['View Products', 'Add Quantity to Inventory', 'Add New Product', 'Exit']
        }
    ]).then(function(user) {
        console.log(user.choose);
        switch(user.choose) {
            case 'View Products':
                viewProducts(function() {
                    bamazonManager();
                });
            break;

            case 'Add Quantity to Inventory':
                addQuantity();
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