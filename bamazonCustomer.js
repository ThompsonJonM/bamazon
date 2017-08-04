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
    bamazonCustomer();
});

function bamazonCustomer() {
    inquirer.prompt([
        {
            name: 'choose',
            type: 'list',
            message: 'Welcome new customer',
            choices: ['View Products', 'Buy Products', 'Exit']
        }
    ]).then(function(user){
        console.log(user.choose);
        switch(user.choose) {
            case 'View Products':
                displayProduct(function() {
                    bamazonCustomer();
                });
            break;

            case 'Buy Products':
                
            break;

            case 'Exit':
                connection.end();
            break;
        }
    })
}

// Display function
function displayProduct(cb) {
    var table = new Table({
        head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
    });

    connection.query('select * from products',
        function(err, res) {
            if (err) throw err;
        for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }

            console.log(table.toString());

            // Allows manager to continue using UI after entry
            // More user friendly than ctl-C
            cb();
        });
}

