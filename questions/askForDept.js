const inquirer = require("inquirer");
// function to display all departments in database
function displayDepartments(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT name FROM departments";

        connection.query(sqlQuery, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};
// function to allow user to select a department
function selectDepartment(dept) {
    return inquirer.prompt([{
        type: "list",
        message: "Select a Department:",
        name: "dept",
        choices: dept
    }]);
};
// gets ID of selected department
function getDeptID(connection, dept) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT id FROM departments AS dept WHERE dept.name = ?";
        connection.query(sqlQuery, dept, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};
// allows user to input name of a new department
function getDeptName() {
    return inquirer.prompt([{
        type: "input",
        message: "Title of role to add?",
        name: "name"
    }
    ]);
};

module.exports = {
    displayDepartments,
    selectDepartment,
    getDeptID,
    getDeptName
};