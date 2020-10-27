const mysql = require("mysql");
const cTable = require("console.table");
const { addEmployee, removeEmp, updateRole, updateManager } = require("./model/adjustData");
const { displayManagers, selectManager,
    selectEmpManager } = require("./questions/askForMng");
const { selectDepartment, displayDepartments, getDeptID } = require("./questions/askForDept");
const { displayRoles, selectRoles, getRoleID } = require("./questions/askForRole");
const { askForName, viewAllEmployess, viewEmpsByDepartment,
    displayEmpsByManager, getEmpsByName, selectEmpByName,
    getEmpID } = require("./questions/askForData");
const askMainMenu = require("./questions/askMainMenu");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ecZ4khM4G26T3eAz1h0q",
    database: "company_db"
});

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
        // console.log(deptSelect);
        deptSelected = await selectDepartment(deptSelect);
        // console.log(deptSelected);
        deptList = await viewEmpsByDepartment(connection, deptSelected.dept);
        console.table(deptList);
        start();
    }
    else if (menu === "View All Employees by Manager") {
        // displays employees of selected manager
        mngSelect = await displayManagers(connection);
        // console.log(mngSelect);
        mngSelected = await selectManager(mngSelect);
        // console.log(mngSelected.mng);
        empListByMng = await displayEmpsByManager(connection, mngSelected.mng);
        console.table(empListByMng);
        start();
    }
    else if (menu === "Add Employee") {
        // adds employee
        // Asks for name of employee
        empName = await askForName();
        // console.log("Emp Name: ");
        // console.log(empName);
        // Asks for employee Role
        roleList = await displayRoles(connection);
        // console.log("Role List: " + roleList); // NOTE: roleList will return [object Object]'s until next line
        roleSelected = await selectRoles(roleList);
        // console.log("Selected Role: ");
        // console.log(roleSelected.role);
        // Gets ID value of selected Role
        roleID = await getRoleID(connection, roleSelected.role);
        // console.log("Role ID:");
        // console.table(roleID);
        // Asks for employee Manager, none is an option
        // console.log(roleID);
        // console.log("Internal of Role ID mngList = await displayManagers(connection);
        // console.log("Manager List: ");
        // console.log(mngList);
        mngSelected = await selectEmpManager(mngList);
        // console.log("Selected Manager: ");
        // console.log(mngSelected);
        // Gets ID value of selected Role, if none wasn't selected
        if (mngSelected.mng !== "None") {
            mngID = await getEmpID(connection, mngSelected.mng);
            // console.log("Manager ID:");
            // console.log(mngID);
            // connection, empName, roleID, mngID
            results = await addEmployee(connection, empName, roleID[0].id, mngID[0].id);
        }
        else {
            // connection, empName, roleID, mngID
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
        // console.log("List of Employees");
        // console.log(empList);
        empSelected = await selectEmpByName(empList);
        // console.log("Selected Emp:");
        // console.log(empSelected);
        empID = await getEmpID(connection, empSelected.emp);
        // console.log("Emp ID:");
        // console.log(empID);
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
        // console.log("Selected Emp:");
        // console.log(empSelected);
        // get emp ID
        empID = await getEmpID(connection, empSelected.emp);
        // console.log("Emp ID:");
        // console.log(empID);
        // get list of departments
        roleList = await displayRoles(connection);
        // select a department
        roleSelected = await selectRoles(roleList);
        // console.log("Selected department");
        // console.log(roleSelected);
        // get ID of role
        roleID = await getRoleID(connection, roleSelected.role);
        // console.log("Role ID:");
        // console.log(roleID);
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
        // console.log("Emp ID:");
        // console.log(empID);
        // select a manager
        mngSelect = await displayManagers(connection);
        // console.log(mngSelect);
        mngSelected = await selectManager(mngSelect);
        // get manager ID
        mngID = await getEmpID(connection, mngSelected.mng);
        // console.log("Mng ID:");
        // console.log(mngID);
        results = await updateManager(connection, mngID[0].id, empID[0].id);
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "View All Roles") {
        // display all roles
    }
    else if (menu === "Add Role") {
        // add role
    }
    else if (menu === "Remove Role") {
        // delete role
    }
    else if (menu === "View All Departments") {
        // display all departments
    }
    else if (menu === "Add Department") {
        // add department
    }
    else if (menu === "Remove Department") {
        // delete department
    }
    else if (menu === "Exit") {
        // exits
        connection.end();
        // console.clear();
        process.exit(0);
    }
};

connection.connect(async () => start());