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
        let query = 'SELECT emp.id, emp.first_name, emp.last_name, roles.title, departments.name AS department, CONCAT(mng.first_name, " ", mng.last_name) AS manager';
        query += " FROM employees AS emp INNER JOIN roles ON emp.roles_id = roles.id";
        query += " INNER JOIN departments on roles.department_id = departments.id LEFT JOIN employees AS mng ON emp.manager_id = mng.id";
        query += " WHERE departments.name = ?";
        connection.query(query, department, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};


module.exports = {
    viewAllEmployess,
    viewEmpsByDepartment
};