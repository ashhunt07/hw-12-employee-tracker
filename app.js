const { restoreDefaultPrompts } = require("inquirer");
// Requirements
var inquirer = require("inquirer");
// const conTab = require('console.table');
const connection = require("./connection");


async function runSearch() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "What would you like to update?",
        choices: [
            "View all employees",
            "View employees by department",
            "View employees by role",
            "Update employee",
            "Remove employee",
            "Add a new employee",
            "Add a department",
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
            case "View employees by department":
                return viewDept();
                break;
            case "View employees by role":
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
                connection.end();
                break;
        }
    });
}

// View all Employee Inforamtion
function allEmployees() {
    console.log("Here is a list of all current employees.")
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

// View all Departments
function viewDept() {
    console.log("Here are all current departments.")
    let query = "SELECT name FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

// View all Roles
function viewRole() {
    console.log("Here are all current roles.")
    let query = "SELECT name FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};


// Remove an Employee
function remove() {
    console.log("Choose and employee to remove.")
    let employeeList = [];
    connection.query(
        "SELECT employee.first_name, employee.last_name FROM employee", (err, res) => {
            for (let i = 0; i < res.length; i++) {
                employeeList.push(res[i].first_name + " " + res[i].last_name);
            }
            inquirer
                .prompt([{
                    type: "list",
                    message: "Which employee would you like to delete?",
                    name: "employeeChoice",
                    choices: employeeList

                }, ])
                .then(function(res) {
                    const query = connection.query(
                        `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
                        function(err, res) {
                            if (err) throw err;
                            console.log("Employee deleted!\n");
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
                .then(function(answer) {
                    let roleID = [];
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].title == answer.role) {
                            roleID = res[i].id;
                        }
                    }
                    connection.query(
                        "INSERT INTO employee SET ?", {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
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


//initialize program
runSearch();