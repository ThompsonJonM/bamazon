// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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

function viewProducts(cb) {
    var table = new Table({
        head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity On Hand']
    });

    connection.query('select * from products', 
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }

            console.log(table.toString());

            cb();
        });
}