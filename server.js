const mysql = require("mysql");
const { viewAllEmployess, viewEmpsByDepartment } = require("./model/displayData");
const askMainMenu = require("./questions/askMainMenu");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ecZ4khM4G26T3eAz1h0q",
    database: "company_db"
});

let data;

async function start() {
    // display menu and save menu choice
    const { menu } = await askMainMenu();
    if (menu === "View All Employees") {
        // display all employees
        data = viewAllEmployess();
        console.table(data);
    }
    else if (menu === "View All Employees by Department") {
        // displays employees of selected department
        data = viewEmpsByDepartment();
        console.table(data);
    }
    else if (menu === "View All Employees by Manager") {
        // displays employees of selected manager
    }
    else if (menu === "Add Employee") {
        // adds employee
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
    }
    else {
        console.log("Invalid option selected, please select a valid option");
    }
}