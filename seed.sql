-- Initial database creation
DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

-- Creation of tables in databases
USE company_DB;
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

INSERT INTO departments(name)
VALUES("IT"),("HR"),("DEV");

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO roles(title, salary, department_id)
VALUES("Developer", 34000, 3),("Dev Lead", 42000, 3),
("Technician", 30000, 1),("SysAdmin", 50000, 1),
("Manager", 25000, 2),("Coordinator", 38000, 2);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    FOREIGN KEY(roles_id) REFERENCES roles(id),
    manager_id INT NULL,
    FOREIGN KEY(manager_id) REFERENCES employees(id)
);

INSERT INTO employees(first_name, last_name, roles_id, manager_id)
VALUES("Bob", "Sagget", 4, NULL),("Test","Last", 3, 1);