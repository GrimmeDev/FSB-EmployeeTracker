const inquirer = require("inquirer");

function askForName() {
    return inquirer.prompt([{
        type: "input",
        message: "What is the employees first name?",
        name: "first_name",
    },
    {
        type: "input",
        message: "What is the employees last name?",
        name: "last_name",
    }]);
};

function viewAllEmployess(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id, emp.first_name, emp.last_name, roles.title, departments.name AS department,";
        sqlQuery += " roles.salary, CONCAT(mng.first_name,' ', mng.last_name) AS manager";
        sqlQuery += " FROM employees AS emp INNER JOIN roles ON emp.roles_id = roles.id";
        sqlQuery += " INNER JOIN departments ON roles.department_id = departments.id";
        sqlQuery += " LEFT JOIN employees AS mng ON emp.manager_id = mng.id";
        // console.log(sqlQuery);
        connection.query(sqlQuery,
            function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
    });
};

function viewEmpsByDepartment(connection, department) {
    return new Promise((resolve, reject) => {
        let sqlQuery = 'SELECT emp.id, emp.first_name, emp.last_name, roles.title, departments.name AS department, CONCAT(mng.first_name, " ", mng.last_name) AS manager';
        sqlQuery += " FROM employees AS emp INNER JOIN roles ON emp.roles_id = roles.id";
        sqlQuery += " INNER JOIN departments on roles.department_id = departments.id LEFT JOIN employees AS mng ON emp.manager_id = mng.id";
        sqlQuery += " WHERE departments.name = ?";
        connection.query(sqlQuery, department, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function displayEmpsByManager(connection, mng) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT CONCAT(emp.first_name, ' ', emp.last_name) AS name FROM employees AS emp";
        sqlQuery += " LEFT JOIN employees AS mng ON emp.manager_id = mng.id";
        sqlQuery += " WHERE CONCAT(mng.first_name, ' ', mng.last_name) = ?";
        connection.query(sqlQuery, mng, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function getEmpsByName(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT CONCAT(emp.first_name, ' ', emp.last_name) AS employee FROM employees as emp", function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

module.exports = {
    askForName,
    viewAllEmployess,
    viewEmpsByDepartment,
    displayEmpsByManager,
    getEmpsByName
}