// Requirements
var inquirer = require("inquirer");
require('console.table');
const connection = require("./connection");


//initialize program
runSearch();


async function runSearch() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            // "Update employee",
            "Remove employee",
            "Add a new employee",
            "Add a new department",
            "Add a new role",
            "Quit"
        ]
    })


    //Initialize list options
    .then(function(result) {
        console.log("You chose to: " + result.options);

        switch (result.options) {
            case "View all employees":
                return allEmployees();
                break;
            case "View all departments":
                return viewDept();
                break;
            case "View all roles":
                return viewRole();
                break;
                // case "Update employee":
                //     return update();
                //     break;
            case "Remove employee":
                return remove();
                break;
            case "Add a new employee":
                return newEmployee();
                break;
            case "Add a new department":
                return newDept();
                break;
            case "Add a new role":
                return newRole();
                break;
            case "Quit":
                quit();
                break;
        };
    });
};


// View all Employee Inforamtion
function allEmployees() {
    console.log("Here is a list of all current employees.")
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id",
        function(err, res) {
            console.table(res);
            if (err) throw err;
            runSearch();
        });
};


// View all Departments
function viewDept() {
    console.log("Here are all current departments.")
    connection.query("SELECT * FROM department", function(err, res) {
        console.table(res);
        if (err) throw err;
        runSearch();
    });
};


// View all Roles
function viewRole() {
    console.log("Here are all current roles.")
    connection.query("SELECT * FROM role", function(err, res) {
        console.table(res);
        if (err) throw err;
        runSearch();
    });
};



// Remove an Employee
function remove() {
    console.log("Choose and employee to remove.")
    let employeeList = [];
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name FROM employee", (err, res) => {
            for (let i = 0; i < res.length; i++) {
                employeeList.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
            }
            inquirer
                .prompt([{
                    type: "list",
                    message: "Which employee would you like to delete?",
                    name: "employeeChoice",
                    choices: employeeList

                }, ])
                .then(function(res) {
                    connection.query(
                        `DELETE FROM employee WHERE concat(id, ' ' ,first_name, ' ' ,last_name) = '${ res.employeeChoice }'`,

                        function(err, res) {
                            if (err) throw err;
                            console.log("Employee deleted!");
                            runSearch();
                        });
                });
        }
    );

};

// Add a new Employee
function newEmployee() {
    console.log("Add new employee information below.")

    connection.query(
        "SELECT * FROM role", (err, res) => {
            if (err) throw err;

            inquirer.prompt([{
                        type: "input",
                        message: "First Name?",
                        name: "first_name",
                    },
                    {
                        type: "input",
                        message: "Last Name?",
                        name: "last_name",
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "Company Role?",
                        // choices: roleList
                        choices: function() {
                            var roleList = [];
                            for (let i = 0; i < res.length; i++) {
                                roleList.push(res[i].title);
                            }
                            return roleList;
                        },
                    }
                ])
                .then(function(res) {
                    let roleID = [];
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].title == res.role) {
                            roleID = res[i].id;
                        }
                    }
                    connection.query(
                        "INSERT INTO employee SET ?", {
                            first_name: res.first_name,
                            last_name: res.last_name,
                            role_id: roleID,
                        },

                        function(err) {
                            if (err) throw err;
                            console.log("Employee successfully added!");
                            runSearch();
                        });
                });
        });
};


function newDept() {
    inquirer.prompt([{
        type: "input",
        message: "Department Name:",
        name: "department"
    }, ])

    .then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.log("Department successfully added!");
            console.table(res);
            runSearch();
        })
    })
}


function newRole() {
    inquirer.prompt([{
        type: "input",
        message: "Enter Role:",
        name: "title"
    }, {
        type: "number",
        message: "Enter Salary:",
        name: "salary"
    }, {
        message: "Enter department ID:",
        type: "number",
        name: "department_id"
    }]).then(function(response) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, response.department_id], function(err, data) {
            if (err) throw err;
            console.table(response);
        })
        runSearch();
    })
}

function quit() {
    connection.end();
    process.exit();
}