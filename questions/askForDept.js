const inquirer = require("inquirer");

function displayDepartments(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT * FROM departments";

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

module.exports = {
    displayDepartments,
    selectDepartment
};