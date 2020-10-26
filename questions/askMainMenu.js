const inquirer = require("inquirer");

const choices = ["View All Employees", "View All Employees by Department", "View All Employees by Manager",
    "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager",
    "View All Roles", "Add Role", "Remove Role",
    "View All Departments", "Add Department", "Remove Department", "Exit"];

function askMainMenu() {
    return inquirer.prompt([
        {
            type: "list",
            message: "Select an option to perform:",
            name: "menu",
            choices: choices
        }
    ]);
};

module.exports = askMainMenu;