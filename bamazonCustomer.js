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
                // selectProduct(function() {
                //     checkOutProduct(function() {
                //         bamazonCustomer();
                //     });
                // });

                selectProduct(function() {
                    bamazonCustomer();
                });
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
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
            }

            console.log(table.toString());

            // Allows manager to continue using UI after entry
            // More user friendly than ctl-C
            cb();
        });
}

function selectProduct(cb) {
    inquirer.prompt([
        {
            name: 'item_id',
            type: 'input',
            message: 'Enter the Product ID you wish to purchase',
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Enter the quantity wou wish to purchase'
        }
    ]).then(function(input) {
        var item = input.item_id;
        var quantity = input.quantity;

        var queryReq = 'select * from products where ?';

        connection.query(queryReq, {item_id: item}, 
            function(err, data) {
                if (err) throw err;
                if (data.length === 0) {
                    console.log('Please enter a valid Product ID');
                    displayProduct(cb);
                } else {
                    var productData = data[0];

                    if (quantity <= productData.stock_quantity) {
                        console.log('The requested item is in stock.');
                    } else {
                        console.log('Insufficient quantity. Your order cannot be placed at this time.');
                        console.log('Please select a new quantity or another item.');
                        displayProduct(cb);
                    }
                }
            })
    })
}