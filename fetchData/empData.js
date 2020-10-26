function getAllEmps(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id, emp.first_name, emp.last_name, roles.title,";
        sqlQuery += " departments.name AS department, roles.salary, CONCAT(mng.first_name,' ', mng.last_name) AS manager";
        sqlQuery += " FROM employees AS emp";
        sqlQuery += " INNER JOIN roles ON emp.roles_id = roles.id";
        sqlQuery += " INNER JOIN departments ON roles.department_id = departments.id";
        sqlQuery += " LEFT JOIN employees AS mng ON emp.manager_id = mng.id";

        connection.query(sqlQuery, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

module.exports = {
    getAllEmps
}