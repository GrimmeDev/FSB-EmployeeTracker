function addEmployee(connection, empName, roleID, mngID) {
    // console.log("Emp Name:");
    // console.log(empName);
    // console.log("In addEmp, roleID: ");
    // console.log(roleID);
    // console.log("In addEmp, mngID: ");
    // console.log(mngID);
    return new Promise((resolve, reject) => {
        let sqlQuery = "INSERT INTO employees (first_name, last_name, roles_id, manager_id)"
        sqlQuery += " VALUES (?, ?, ?, NULLIF(?,0))";
        connection.query(sqlQuery, [empName.first_name, empName.last_name, roleID, mngID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function removeEmp(connection, empID) {
    console.log("Emp ID");
    console.log(empID);
    return new Promise((resolve, reject) => {
        let sqlQuery = "DELETE FROM employees AS emp WHERE emp.id = ?";
        connection.query(sqlQuery, empID, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function updateRole(connection, roleID, empID) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "UPDATE employees AS emp SET roles_id = ? WHERE emp.id = ?";
        connection.query(sqlQuery, [roleID, empID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function updateManager(connection, mngID, empID) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "UPDATE employees AS emp SET manager_id = ? WHERE emp.id = ?";
        connection.query(sqlQuery, [mngID, empID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function addRole(connection, role, deptID) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "INSERT INTO roles (title, salary, department_id)";
        sqlQuery += "VALUES (?, ?, ?)";
        connection.query(sqlQuery, [role.title, role.salary, deptID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function deleteRole(connection, role) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "DELETE FROM roles WHERE title = ?";
        connection.query(sqlQuery, role, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

function addDept(connection, dept) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "INSERT INTO departments (name)";
        sqlQuery += "VALUES (?)";
        connection.query(sqlQuery, dept, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

module.exports = {
    addEmployee,
    removeEmp,
    updateRole,
    updateManager,
    addRole,
    deleteRole,
    addDept
};