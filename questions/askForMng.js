const inquirer = require("inquirer");
// gets all managers and displays as a singular concatenated name
function displayManagers(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT CONCAT(emp.first_name, ' ', emp.last_name) AS name FROM employees AS emp WHERE manager_id IS NULL";
        connection.query(sqlQuery, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};
// displays all managers
function selectManager(mngs) {
    return inquirer.prompt([{
        type: "list",
        message: "Select a Manager:",
        name: "mng",
        choices: mngs
    }]);
};
// displays all managers but also adds a None option
function selectEmpManager(mngs) {
    mngs.unshift("None");
    return inquirer.prompt([{
        type: "list",
        message: "Select a Manager:",
        name: "mng",
        choices: mngs
    }]);
};

module.exports = {
    displayManagers,
    selectManager,
    selectEmpManager,
};