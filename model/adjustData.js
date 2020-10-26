function addEmployee(connection, empName, roleID, mngID) {
    // console.log(empName);
    console.log("In addEmp: " + roleID);
    console.log("In addEmp: " + mngID);
    return new Promise((resolve, reject) => {
        let sqlQuery = "INSERT INTO employees (first_name, last_name, roles_id, manager_id)"
        sqlQuery += " VALUES (?, ?, ?, ?);";
        connection.query(sqlQuery, [empName.first_name, empName.last_name, roleID, mngID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

module.exports = {
    addEmployee
};