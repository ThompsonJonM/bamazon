create database bamazondb;

use bamazondb;

create table products (
    item_id int auto_increment not null,
    product_name varchar(255) not null,
    department_name varchar(255) not null,
    price decimal(10,2) not null,
    stock_quantity int not null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('Thistle Tea', 'Food & Grocery', 9.50, 25);

insert into products (product_name, department_name, price, stock_quantity)
values ('Frost Oil', 'Sports & Outdoors', 25.00, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ('Runecloth Bag', 'Clothing, Shoes, & Jewelry', 69.99, 12);

insert into products (product_name, department_name, price, stock_quantity)
values ('Adamantine Rod', 'Handmade', 19.99, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ('Gnomish Universal Remote', 'Electronics, Computers, & Office', 24.99, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ('Shadow Oil', 'Sports & Outdoors', 12.00, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ('A Steamy Romance Novel', 'Books & Audible', 3.99, 5);

insert into products (product_name, department_name, price, stock_quantity)
values ('Six Demon Bag', 'Clothing, Shoes, & Jewelry', 209.99, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ('Gnomish Wormhole Generator', 'Electronics, Computers, & Office', 399.99, 2);

insert into products (product_name, department_name, price, stock_quantity)
values ('Deviate Fish', 'Food & Grocery', 4.99, 20);