DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

USE employeesDB;


-- Create the table for departments
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


-- Create the table for employee roles
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(5,2),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);


-- Create the table for employee info
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);