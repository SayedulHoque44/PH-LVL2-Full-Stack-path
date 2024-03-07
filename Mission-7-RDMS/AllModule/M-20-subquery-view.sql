-- Active: 1708939592559@@127.0.0.1@5432@ph

CREATE TABLE employees2 (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE
)

INSERT INTO employees2 (employee_name, department_name, salary, hire_date) VALUES
    ('John Doe', 'Engineering', 60000.00, '2023-01-15'),
    ('Jane Smith', 'Engineering', 65000.00, '2022-05-20'),
    ('Michael Johnson', 'Engineering', 70000.00, '2022-08-10'),
    ('Emily Davis', 'Engineering', 62000.00, '2023-02-28'),
    ('William Brown', 'Engineering', 68000.00, '2022-11-05'),
    ('Jessica Wilson', 'Engineering', 63000.00, '2023-03-10'),
    ('David Martinez', 'Sales', 55000.00, '2023-04-02'),
    ('Maria Garcia', 'Sales', 58000.00, '2022-07-18'),
    ('James Miller', 'Sales', 60000.00, '2023-01-20'),
    ('Jennifer Taylor', 'Sales', 57000.00, '2022-09-15'),
    ('Robert Anderson', 'Sales', 59000.00, '2022-12-30'),
    ('Lisa Thomas', 'Marketing', 62000.00, '2023-02-05'),
    ('Daniel Hernandez', 'Marketing', 64000.00, '2022-10-12'),
    ('Patricia Lopez', 'Marketing', 63000.00, '2023-03-25'),
    ('Richard Gonzalez', 'Marketing', 65000.00, '2022-06-08'),
    ('Mary Wilson', 'Marketing', 66000.00, '2022-08-20'),
    ('Charles Lee', 'Finance', 70000.00, '2022-11-12'),
    ('Susan Scott', 'Finance', 72000.00, '2023-04-15'),
    ('Matthew Young', 'Finance', 71000.00, '2022-12-03'),
    ('Karen Hall', 'HR', 55000.00, '2022-09-28'),
    ('Joseph Clark', 'HR', 58000.00, '2023-01-10'),
    ('Nancy Allen', 'HR', 57000.00, '2022-07-05'),
    ('Mark King', 'IT', 65000.00, '2022-06-15'),
    ('Betty Green', 'IT', 68000.00, '2023-02-18'),
    ('Donald Baker', 'IT', 67000.00, '2022-10-30'),
    ('Margaret Adams', 'IT', 69000.00, '2023-03-05'),
    ('Steven Hill', 'Operations', 60000.00, '2022-08-25'),
    ('Dorothy Turner', 'Operations', 61000.00, '2023-01-05'),
    ('Andrew Carter', 'Operations', 62000.00, '2022-11-20');


SELECT * FROM employees2

----------------- Sub query------------------
SELECT max(salary) FROM employees2 WHERE department_name ='HR' -- 58000.00

SELECT * FROM employees2 WHERE salary > (SELECT max(salary) FROM employees2 WHERE department_name ='HR') -- point to be noted - use sub query with requirment and u have to keep eye value it's return. - here single value needed and sub query single value returned. 


SELECT*,(SELECT sum(salary) FROM employees2) FROM employees2 -- if you want to show sum of salary in every row 

SELECT department_name,sum(salary) from employees2 GROUP BY department_name

SELECT * FROM --main query
    (SELECT department_name,sum(salary) from employees2 GROUP BY department_name) as sum_dept_salary -- sub query -- notice here this sub query return a table,here we agin selecting * from this table , that's mean we can get ONLY COLUMN that we need , like we also can perform a so many query here for inquery. Below


SELECT department_name FROM (SELECT department_name,sum(salary) from employees2 GROUP BY department_name) as sum_dept_salary 

SELECT * FROM 
    (SELECT department_name,sum(salary) as dep_salary from employees2 GROUP BY department_name) as sum_dept_salary
        WHERE dep_salary > 170000.00

-- 
SELECT department_name FROM employees2 WHERE department_name LIKE '%R%'-- dep with r

SELECT employee_name,salary,department_name
FROM employees2
WHERE department_name IN
(SELECT department_name FROM employees2 WHERE department_name LIKE '%R%') -- it's return single COLUMN with r -- note multiple COLUMN not support in IN clause.so carefull
    


--------------------------- VIEW --------------------------
-- view is like store a complex query result in a variable and use it when every need calling this varriable NAME
-- simplify complex query

CREATE VIEW dept_avg_salary -- define view name
AS
SELECT department_name,avg(salary) FROM employees2 GROUP BY department_name-- actual query

SELECT * FROM dept_avg_salary -- use the VIEW

SELECT department_name FROM dept_avg_salary -- implement query depend on the return value.

