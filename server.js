const mysql = require("mysql");
const cTable = require("console.table");
const { addEmployee } = require("./model/adjustData");
const { displayManagers, selectManager,
    selectEmpManager, getMngID } = require("./questions/askForMng");
const { selectDepartment, displayDepartments } = require("./questions/askForDept");
const { displayRoles, selectRoles, getRoleID } = require("./questions/askForRole");
const { askForName, viewAllEmployess, viewEmpsByDepartment,
    displayEmpsByManager, getEmpsByName } = require("./questions/askForData");
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
        console.log(mngSelect);
        mngSelected = await selectManager(mngSelect);
        console.log(mngSelected.mng);
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
        // cons:");
        // console.table(roleID);
        // Asks for employee Manager, none is an option
       ole.log(roleID);
        // console.log("Internal of Role ID mngList = await displayManagers(connection);
        // console.log("Manager List: ");
        // console.log(mngList);
        mngSelected = await selectEmpManager(mngList);
        // console.log("Selected Manager: ");
        // console.log(mngSelected);
        // Gets ID value of selected Role, if none wasn't selected
        if (mngSelected.mng !== "None") {
            mngID = await getMngID(connection, mngSelected.mng);
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
        console.log("List of Employees");
        console.log(empList);

        start();
    }
    else if (menu === "Update Employee Role") {
        // change role of employee
    }
    else if (menu === "Update Employee Manager") {
        // change manager of employee
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