DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price VARCHAR(10) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id) 
);

INSERT INTO product (product_name, department_name, price, stock_quantity) VALUES 
('Remington Hair Dryer', 'Electronics', '$19.96', 10),
('Shoehorn', 'Shoes', '$8.95', 70),
('Pet Brush', 'Pets', '$15.99', 40),
('Measuring Cups', 'Kicthen', '$24.97', 50),
('Samsung 1TB SSD', 'Electronics', '$319.99', 5),
('BISSELL Vacuum', 'Home', '$75.04', 12),
('Wilson Basketball', 'Sports', '$47.97', 35),
('Sandisk MicroSD 128GB Card', 'Electronics', '$26.19', 2),
('Knife Sharpener', 'Kicthen', '$14.95', 10),
('Mancro Backpack', 'Home', '$30.99', 25);