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
            name: 'route',
            type: 'list',
            message: 'Please select how you would like to search for a product.',
            choices: ['Product ID', 'Product Name']
        }

    ]).then(function(user) {
        var items = [];

        if (user.route === 'Product Name') {

            connection.query('select product_name from products', 
                function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        items.push(res[i].product_name)
                    }

                    inquirer.prompt([

                        {
                            name: 'product_name',
                            type: 'list',
                            message: 'Please select the product you wish to purchase',
                            choices: items
                        },

                        {
                            name: 'quantity',
                            type: 'input',
                            message: 'Enter the quantity you wish to purchase'
                        }

            ]).then(function(input) {
                var item = input.product_name;
                var quantity = input.quantity;

                var queryReq = 'select * from products where ?';

                connection.query(queryReq, {product_name: item}, 
                    function(err, data) {
                        if (err) throw err;
                        if (data.length === 0) {
                            console.log('Please enter a valid Product Name');
                            bamazonCustomer(cb);
                        } else {
                            var productData = data[0];

                            if (quantity <= productData.stock_quantity) {
                                console.log('The requested item is in stock.');

                                inquirer.prompt([

                                    {
                                        name: 'cart',
                                        type: 'list',
                                        message: 'Would you like to place this item into your cart?',
                                        choices: ['Yes', 'No, Keep Shopping']
                                    }

                                ]).then(function(choice) {
                                    if (choice.cart === 'Yes') {
                                        console.log('Item placed into your cart!');

                                        inquirer.prompt([

                                            {
                                                name: 'checkOut',
                                                type: 'list',
                                                message: 'Would you like to check out?',
                                                choices: ['Yes', 'No, keep shopping']
                                            }

                                        ]).then(function(check) {
                                            if (check.checkOut === 'Yes') {
                                                checkOut();
                                            } else {
                                                selectProduct(cb);
                                            }
                                        })

                                    } else if (choice.cart === 'No, Keep Shopping') {
                                        selectProduct(cb);
                                    }
                                })

                            } else {
                                console.log('Insufficient quantity. Your order cannot be placed at this time.');
                                console.log('Please select a new quantity or another item.');
                                bamazonCustomer(cb);
                            }
                        }
                    })
                })
            })

        } else if (user.route === 'Product ID') {

            connection.query('select item_id from products', 
                function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        items.push(res[i].item_id)
                    }

                    inquirer.prompt([

                        {
                            name: 'item_id',
                            type: 'input',
                            message: 'Enter the product ID you wish to purchase'
                        },

                        {
                            name: 'quantity',
                            type: 'input',
                            message: 'Enter the quantity you wish to purchase'
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
                            bamazonCustomer(cb);
                        } else {
                            var productData = data[0];

                            if (quantity <= productData.stock_quantity) {
                                console.log('The requested item is in stock.');

                                inquirer.prompt([

                                    {
                                        name: 'cart',
                                        type: 'list',
                                        message: 'Would you like to place this item into your cart?',
                                        choices: ['Yes', 'No, Keep Shopping']
                                    }

                                ]).then(function(choice) {
                                    if (choice.cart === 'Yes') {
                                        console.log('Item placed into your cart!');

                                        inquirer.prompt([

                                            {
                                                name: 'checkOut',
                                                type: 'list',
                                                message: 'Would you like to check out?',
                                                choices: ['Yes', 'No, keep shopping']
                                            }

                                        ]).then(function(check) {
                                            if (check.checkOut === 'Yes') {
                                                checkOut(id, quantity);
                                            } else {
                                                selectProduct(cb);
                                            }
                                        })

                                    } else if (choice.cart === 'No, Keep Shopping') {
                                        selectProduct(cb);
                                    }
                                })

                            } else {
                                console.log('Insufficient quantity. Your order cannot be placed at this time.');
                                console.log('Please select a new quantity or another item.');
                                selectProduct(cb);
                            }
                        }
                    })
                })
            })
        }
    })
}

function checkOut() {
    connection.query('update products set stock_quantity = ' + quantity + ' where item_id = ' + 'item_id = ' + item, function(err, res) {
        if (err) throw err;
        console.log('Purchased ' + quantity + ' of ' + item);
    });
}