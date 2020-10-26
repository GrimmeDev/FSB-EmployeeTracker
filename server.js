const mysql = require("mysql");
const cTable = require("console.table");
const { addEmployee } = require("./model/adjustData");
const { displayManagers, selectManager,
    selectEmpManager } = require("./questions/askForMng");
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
        allEmps = await getAllEmps(connection);
        console.table(allEmps);
        start();
    }
    else if (menu === "View All Employees by Department") {
        // displays employees of selected department
        // get list of Departments
        allDepts = await getDepartments(connection);
        console.table(allDepts);


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
        // figure out way to grab ID of role
        mngList = await displayManagers(connection);
        console.log("Manager List: ");
        console.log(mngList);
        // mngSelected = await selectEmpManager(connection, mngList);
        // console.log("Selected Manager: ");
        // console.log(mngSelected);

        start();
    }
    else if (menu === "Remove Employee") {
        // deletes employee
        // display all employees names
        empList = await getEmpsByName(connection);
        console.log("List of emps" + empList);

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