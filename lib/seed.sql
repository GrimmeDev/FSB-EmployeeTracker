--Initial database creation
DROP DATABASE IF EXISTS department_db;
DROP DATABASE IF EXISTS role_db;
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE department_db;
CREATE DATABASE role_db;
CREATE DATABASE employee_db;

--Creation of tables in databases
USE department_db;
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

INSERT INTO departments(name)
VALUES("IT"),("HR"),("DEV");

USE role_db;
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (department_id) INT REFERENCES(departments)
);

INSERT INTO roles(title, salary, department_id)
VALUES("Developer", 34000, 3),("Dev Lead", 42000, 3),
("Technician", 30000, 1),("SysAdmin", 50000, 1),
("Manager", 25000,3),("Coordinator", 38000, 3);

USE employee_db;
CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY(role_id) INT REFERENCES(roles),
    manager_id INT NULL,
    CONSTRAINT FOREIGN KEY(manager_id) REFERENCES(employees)
);

INSERT INTO employees(first_name, last_name, role_id)
VALUES