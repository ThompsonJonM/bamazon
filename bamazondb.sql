create database bamazonbd;

use bamazondb;

create table products (
    item_id int not null auto_increment,
    product_name varchar(255) null,
    department_name varchar(255) null,
    price decimal(10,2) null,
    stock_quantity int null,
    primary key (item_id)
);