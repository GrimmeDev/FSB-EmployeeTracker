const inquirer = require("inquirer");

function displayRoles(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT title FROM roles";

        connection.query(sqlQuery, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function selectRoles(roles) {
    // console.log("In select Roles: " + roles);
    roleList = roles.map(el => el.title);
    // console.log("In select Roles: " + roleList);
    return inquirer.prompt([{
        type: "list",
        message: "Select a Role:",
        name: "role",
        choices: roleList
    }]);
};

function getRoleID(connection, role) {
    console.log("Get ID of Role: " + role);
    return new Promise((resolve, reject) => {
        connection.query("SELECT id FROM roles WHERE title = ?", role, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

module.exports = {
    displayRoles,
    selectRoles,
    getRoleID
}