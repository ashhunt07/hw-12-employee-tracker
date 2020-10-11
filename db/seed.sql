USE employeeDB;

INSERT INTO department (name)
VALUES ('Sales'), ('Prodct Development'), ('Marketing'), ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 63000, 1), ('Salesperson', 55000, 1), ('Product Engineer', 150000, 2), ('Graphic Designer', 53000, 3), ('Copy Writer', 47000, 3), ('Web Developer', 65000, 3), ('Accountant', 125000, 4), ('Accounts Payable', 122000, 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Raye', 'Hino', 1, 3), ('Usagi', 'Tsukino', 2, 3), ('Ami', 'Mizuno', 3, 2), ('Makoto', 'Kino', 4, null), ('Minako', 'Aino', 5, 1), ('Mamoru', 'Chiba', 5, 1);