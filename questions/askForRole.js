const inquirer = require("inquirer");
// gets all roles
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
// displays all roles by title only
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
// gets ID of specific role
function getRoleID(connection, role) {
    // console.log("Get ID of Role: " + role);
    return new Promise((resolve, reject) => {
        connection.query("SELECT id FROM roles WHERE title = ?", role, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};
// allows user to dictate a new role title and salary
function getRoleTitle() {
    return inquirer.prompt([{
        type: "input",
        message: "Title of role to add?",
        name: "title"
    },
    {
        type: "input",
        message: "Salary of the role?",
        name: "salary"
    }
    ]);
};

module.exports = {
    displayRoles,
    selectRoles,
    getRoleID,
    getRoleTitle
}