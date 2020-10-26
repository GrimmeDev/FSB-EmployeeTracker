const inquirer = require("inquirer");

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

function selectManager(mngs) {
    return inquirer.prompt([{
        type: "list",
        message: "Select a Manager:",
        name: "mng",
        choices: mngs
    }]);
};

function selectEmpManager(mngs) {
    mngs.unshift("None");
    return inquirer.prompt([{
        type: "list",
        message: "Select a Manager:",
        name: "mng",
        choices: mngs
    }]);
};

function getMngID(connection, mng) {
    console.log("Get ID of Manager: " + mng);
    return new Promise((resolve, reject) => {
        connection.query("SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?", mng, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

module.exports = {
    displayManagers,
    selectManager,
    selectEmpManager,
    getMngID
};