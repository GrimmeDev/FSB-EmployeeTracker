const mysql = require("mysql");
const cTable = require("console.table");
const { addEmployee } = require("./model/adjustData");
const { displayManagers, selectManager,
    selectEmpManager, getManagerID } = require("./questions/askForMng");
const { selectDepartment, displayDepartments } = require("./questions/askForDept");
const { displayRoles, selectRoles, getRoleID } = require("./questions/askForRole");
const { askForName,
    viewAllEmployess,
    viewEmpsByDepartment,
    displayEmpsByManager } = require("./questions/askForData");
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
        empName = await askForName();
        // console.log(empName);
        roleSelect = await displayRoles(connection);
        // console.log(roleSelect);
        roleSelected = await selectRoles(roleSelect);
        console.log("In menuAddEmp: " + roleSelected);
        roleID = await getRoleID(connection, roleSelected);
        console.log("In menuAddEmp: " + roleID);
        mngSelect = await displayManagers(connection);
        // // console.log(mngSelect);
        mngSelected = await selectEmpManager(mngSelect);
        console.log("In menuAddEmp: " + mngSelected);
        mngID = await getManagerID(connection, mngSelected);
        console.log("In menuAddEmp: " + mngID);
        results = await addEmployee(connection, empName, roleID, mngID);
        console.log(`Inserted ${results.affectedRows} entries.`);
        start();
    }
    else if (menu === "Remove Employee") {
        // deletes employee
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