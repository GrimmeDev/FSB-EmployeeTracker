const inquirer = require("inquirer");

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

function selectDepartment(dept) {
    return inquirer.prompt([{
        type: "list",
        message: "Select a Department:",
        name: "dept",
        choices: dept
    }]);
};

function getDeptID(connection, dept) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT id FROM departments AS dept WHERE dept.name = ?";
        connection.query(sqlQuery, dept, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

module.exports = {
    displayDepartments,
    selectDepartment,
    getDeptID
};