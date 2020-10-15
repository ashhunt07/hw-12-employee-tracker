USE employeesDB;

-- DEPARTMENT SEEDS --
INSERT INTO department (name)
VALUES ('Sales'), ('Product Development'), ('Marketing'), ('Finance');

-- EMPLOYEE ROLE SEEDS --
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 63000, 1), 
('Salesperson', 55000, 1), 
('Product Engineer', 150000, 2), 
('Graphic Designer', 53000, 3), 
('Copy Writer', 47000, 3), 
('Web Developer', 65000, 3), 
('Accountant', 125000, 4), 
('Accounts Payable', 122000, 4); 

-- DEPARTMENT SEEDS --
INSERT INTO employee (first_name, last_name, manager_id, role_id) 
VALUES 
('Usagi', 'Tsukino', null, 3), 
('Raye', 'Hino', 1, 5), 
('Ami', 'Mizuno', 1, 3), 
('Makoto', 'Kino', 1, 4), 
('Minako', 'Aino', 1, 5), 
('Mamoru', 'Chiba', null, 7);


-- SELECTING FOR CREATING --
-- TABLES IN OUR SQL WORKBENCH --
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;