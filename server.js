//#region File and Requirement Declaration
const mysql = require("mysql");
const cTable = require("console.table");
const { addEmployee, removeEmp, updateRole, updateManager,
    addRole, deleteRole, addDept, removeDept } = require("./model/adjustData");
const { displayManagers, selectManager,
    selectEmpManager } = require("./questions/askForMng");
const { selectDepartment, displayDepartments,
    getDeptID, getDeptName } = require("./questions/askForDept");
const { displayRoles, selectRoles, getRoleID, getRoleTitle } = require("./questions/askForRole");
const { askForName, viewAllEmployess, viewEmpsByDepartment,
    displayEmpsByManager, getEmpsByName, selectEmpByName,
    getEmpID } = require("./questions/askForData");
const askMainMenu = require("./questions/askMainMenu");
//#endregion

//#region Connection Info
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ecZ4khM4G26T3eAz1h0q",
    database: "company_db"
});
//#endregion
//#region Main Application
async function start() {
    // display menu and save menu choice
    const { menu } = await askMainMenu();
    if (menu === "View All Employees") {
        // display all employees
        empList = await viewAllEmployess(connection);
        console.table(empList);
        start();
    }
    else if (menu === "View All Employees by Department") {
        // displays employees of selected department
        deptSelect = await displayDepartments(connection);
        // asks user to select a department
        deptSelected = await selectDepartment(deptSelect);
        // displays list of of employes in that department
        deptList = await viewEmpsByDepartment(connection, deptSelected.dept);
        console.table(deptList);
        start();
    }
    else if (menu === "View All Employees by Manager") {
        // displays employees of selected manager
        mngSelect = await displayManagers(connection);
        // asks user to select a manager
        mngSelected = await selectManager(mngSelect);
        // displays list of employees under the selected manager
        empListByMng = await displayEmpsByManager(connection, mngSelected.mng);
        console.table(empListByMng);
        start();
    }
    else if (menu === "Add Employee") {
        // adds employee
        // Asks for name of employee
        empName = await askForName();
        // Asks for employee Role
        roleList = await displayRoles(connection);
        roleSelected = await selectRoles(roleList);
        // Gets ID value of selected Role
        roleID = await getRoleID(connection, roleSelected.role);
        // Asks for employee Manager, none is an option
        mngList = await displayManagers(connection);
        mngSelected = await selectEmpManager(mngList);
        // conditional if user selected None for manager
        if (mngSelected.mng !== "None") {
            // Gets ID value of selected Role, if none wasn't selected
            mngID = await getEmpID(connection, mngSelected.mng);
            results = await addEmployee(connection, empName, roleID[0].id, mngID[0].id);
        }
        else {
            // slot for mngID set to 0 for SQL Query conditional of NULLIF(?, 0)
            results = await addEmployee(connection, empName, roleID[0].id, 0);
        }
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Remove Employee") {
        // deletes employee
        // display all employees names
        empList = await getEmpsByName(connection);
        // asks user to select an employee
        empSelected = await selectEmpByName(empList);
        // gets the ID value of the selected employee
        empID = await getEmpID(connection, empSelected.emp);
        // deletes selected employee by ID
        results = await removeEmp(connection, empID[0].id);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Update Employee Role") {
        // change role of employee
        // get list of employees
        empList = await getEmpsByName(connection);
        // select an employee
        empSelected = await selectEmpByName(empList);
        // get emp ID
        empID = await getEmpID(connection, empSelected.emp);
        // get list of departments
        roleList = await displayRoles(connection);
        // select a department
        roleSelected = await selectRoles(roleList);
        // get ID of role
        roleID = await getRoleID(connection, roleSelected.role);
        // updates selected employee to contain new role
        results = await updateRole(connection, roleID[0].id, empID[0].id);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Update Employee Manager") {
        // change manager of employee
        // get list of employees
        empList = await getEmpsByName(connection);
        // select an employee
        empSelected = await selectEmpByName(empList);
        // get emp ID
        empID = await getEmpID(connection, empSelected.emp);
        // select a manager
        mngSelect = await displayManagers(connection);
        // asks user to select a manager
        mngSelected = await selectManager(mngSelect);
        // get manager ID
        mngID = await getEmpID(connection, mngSelected.mng);
        // updates selected employee to have new manager
        results = await updateManager(connection, mngID[0].id, empID[0].id);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "View All Roles") {
        // display all roles
        roleList = await displayRoles(connection);
        console.table(roleList);
        start();
    }
    else if (menu === "Add Role") {
        // add role
        // ask for role name and salary
        newRole = await getRoleTitle();
        // newRole.title and newRole.salary
        // get list of departments
        deptList = await displayDepartments(connection);
        // user selects department to add role into
        deptSelected = await selectDepartment(deptList);
        // deptSelected.dept
        // gets ID of selected department
        deptID = await getDeptID(connection, deptSelected.dept);
        // deptID.id
        // adds role to database
        results = await addRole(connection, newRole, deptID[0].id);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Remove Role") {
        // delete role
        // get list of roles
        roleList = await displayRoles(connection);
        // prompt user to select a role
        roleSelected = await selectRoles(roleList);
        // roleSelected.role
        results = await deleteRole(connection, roleSelected.role);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "View All Departments") {
        // display all departments
        deptList = await displayRoles(connection);
        console.table(deptList);
        start();
    }
    else if (menu === "Add Department") {
        // add department
        // asks user for new department name
        deptName = await getDeptName();
        // deptName.name
        results = await addDept(connection, deptName.name);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Remove Department") {
        // delete department
        // get list of departments
        deptList = await displayDepartments(connection);
        // user selects department to remove
        deptSelected = await selectDepartment(deptList);
        // get department ID
        deptID = await getDeptID(connection, deptSelected.dept);
        // deptID.id
        results = await removeDept(connection, deptID[0].id);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Exit") {
        // exits
        connection.end();
        console.clear();
        process.exit(0);
    }
};
//#endregion
// App starts when node server.js called
connection.connect(async () => start());