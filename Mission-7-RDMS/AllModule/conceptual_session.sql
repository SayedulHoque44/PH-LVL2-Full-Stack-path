-- Active: 1708939592559@@127.0.0.1@5432@ph

-----------Data TYPE ----------
-- BOOLEAN -> true,false, NULL
-- INTEGER -> INT(4 bytes,),BIGINT,SMALLINT,FLOAT4,NUMERIC(5,3), SERIAL(1,2,3..n)
-- CHARACTER -> char(50)-50 length fixed and jayga dokhol kre rakhbe 50 char dek ba na dek, VARCHAR(50) max 50 but storage nosto krbe na jototuku drkar toto tuku nibe, TEXT not fixed as much big text length
-- DATE -> in postgres date are so much flexible,

---------- Constraint ---------
-- not NULL -> cannot be NULL,and in sql EMPTY means NULL
-- UNIQUE -> COLUMN data must be UNIQUE in TABLE of other
-- CHECK -- condition

CREATE Table persons (
    id SERIAL  PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT check(age >0),
    profession VARCHAR(100),
    isActive BOOLEAN,
    dob DATE check (dob <= current_date),
    rating NUMERIC(3,2)--total 3 and point will 2 and , total 3 with point value also
)

DROP TABLE persons


INSERT INTO persons (id,  name ,  age , profession , isActive , dob,rating ) 
    VALUES (1,'sayed',25,'proffesor',true,'2023-01-09',4.1)

SELECT * FROM persons

TRUNCATE persons

----------------------------------  ALTER

-- update table name
ALTER Table pepole --indicate
    RENAME to persons -- aciton

-- add COLUMN
ALTER Table persons
    ADD COLUMN email VARCHAR(80) NOT NULL DEFAULT 'default@gmail.com', -- becouse of not NULL there will be error cz there other email found NULL, that's why we have to set a DEFAULT valus for other COLUMN or if there email not provided in creating COLUMN,

-- change COLUMN data TYPE
ALTER Table persons
    alter COLUMN name type VARCHAR(40);

-- add COLUMN constraint NOT NULL
ALTER Table persons
    alter COLUMN profession set  NOT NULL

-- drop COLUMN constraint
ALTER Table persons
    alter COLUMN profession DROP  NOT NULL

-- add and drop COLUMN constraint UNIQUE & PRIMARY KEY
ALTER Table persons
    ADD constraint check_person_dob UNIQUE(dob)

ALTER Table persons
    ADD constraint pkey_person_email PRIMARY KEY(dob) -- but multiple PK not allowed

ALTER Table persons
    DROP constraint check_person_dob 


-------------------------------- 

INSERT INTO persons (name, age, profession, isActive, dob, rating) VALUES
('John Smith', 35, 'Engineer', TRUE, '1989-05-15', 4.75),
('Alice Johnson', 28, 'Doctor', TRUE, '1996-10-20', 4.20),
('Michael Davis', 42, 'Lawyer', TRUE, '1982-03-10', 3.50),
('Emily Brown', 31, 'Teacher', FALSE, '1993-08-08', 4.00),
('David Wilson', 39, 'Software Developer', TRUE, '1985-12-25', 4.80),
('Sarah Taylor', 45, 'CEO', TRUE, '1979-07-01', 4.90),
('Jessica Martinez', 27, 'Nurse', TRUE, '1997-11-18', 4.25),
('Matthew Thompson', 33, 'Accountant', FALSE, '1991-09-05', 3.75),
('Jennifer White', 29, 'Marketing Specialist', TRUE, '1995-04-30', 4.15),
('Ryan Clark', 37, 'Architect', TRUE, '1987-06-22', 4.60),
('Amanda Hall', 40, 'Project Manager', FALSE, NULL, 3.90),
('Daniel Lee', 26, 'Graphic Designer', TRUE, '1998-02-14', 4.30),
('Melissa Adams', 34, 'HR Manager', TRUE, '1990-01-28', 4.40),
('Christopher Wright', 38, 'Consultant', TRUE, '1986-04-17', 4.70),
('Lauren Scott', 32, 'Writer', FALSE, '1992-07-09', 3.80),
('Brandon Green', 36, 'Sales Representative', TRUE, '1988-09-03', 4.55),
('Rachel Baker', 30, 'Event Planner', TRUE, NULL, 4.10),
('Kevin Rodriguez', 43, 'Entrepreneur', TRUE, '1981-12-08', 4.85),
('Olivia Garcia', 25, 'Researcher', FALSE, '1999-05-20', 3.65),
('Jason Hernandez', 31, 'Real Estate Agent', TRUE, '1993-10-10', 4.35);

SELECT * FROM persons

TRUNCATE persons

-- assertion
SELECT name as user_name,age FROM persons

--  WHERE(conditon)
SELECT name as user_name,age FROM persons
    WHERE age >40

-------------------------- AND - OR - IN - BETWEEN - LIKE - ILIKE - DISTINCT
SELECT name as user_name,age,isActive FROM persons
    WHERE age >40 AND isActive = TRUE

SELECT name as user_name,age,isActive FROM persons
    WHERE age >40 OR isActive = TRUE

SELECT name as user_name,age,profession FROM persons
    WHERE age >20 AND profession IN('Doctor','Engineer','CEO');


SELECT name as user_name,age FROM persons
    WHERE age BETWEEN 20 and 35

SELECT name,age from persons
    WHERE name LIKE 'M%' -- start with a in name - its a case in sensative, we can use ILIKE for inCaseSensative

SELECT name,age from persons
    WHERE name ILIKE '%s' -- end with s in name - its a inCaseSensative

SELECT name,age from persons
    WHERE name ILIKE '__i%' -- skip first 2 CHARACTER and then if there in i,


SELECT name,age from persons
    WHERE name ILIKE '__________' -- 10 underscore means give all character length 10


SELECT name,age from persons
    WHERE name ILIKE '%a%' -- if a EXISTS, start end where ever char can be,

SELECT DISTINCT isActive from persons -- is like group the VALUES only take UNIQUE values



----------------------- GROUP BY - SCALAR & AGGREGATE FUNCTION -------------------

SELECT profession FROM persons GROUP BY profession

SELECT isActive,count(*) FROM persons GROUP BY isActive --group with aggregate fn count, count take a split of group catagory a multiple input and return a single value of total COLUMN there have.

SELECT upper(name) from persons -- upper SCALAR fn, its run for every row and return a value in every row when ran,

SELECT isActive,sum(age),round(avg(age)) as avarage,min(age),max(age) from persons
    GROUP BY isActive

---------------- NULL - COALESCE
SELECT name,dob from persons
    WHERE dob is NULL -- not work dob = NULL,

SELECT name,dob from persons
    WHERE dob is NOT NULL 

SELECT COALESCE(NULL,NULL,4,NULL,9) -- it will return value which if first truthy value

SELECT name,age,COALESCE(dob,'2022-03-03') as dob FROM persons -- when a dob COLUMN found with NULL then DEFAULT VALUE will be this '2022-03-03'

------------ LIMIT AND OFFSET
SELECT id,name from persons LIMIT 3 OFFSET 3*1 -- OFFSET(skip)

---------------------- FOREIGN KEY - REFERENCES -------

CREATE Table coustomer(
    coustomer_id INT PRIMARY KEY,
    name VARCHAR(50) not NULL,
    email VARCHAR(100)
)

CREATE Table "order"(
    order_id INT PRIMARY KEY,
    coustomer_id INT,
    name VARCHAR(50) not NULL,
    order_date DATE,
    total_amount DECIMAL(10,2),
    Foreign Key (coustomer_id) REFERENCES coustomer(coustomer_id)  
)


-- Inserting data into the "coustomer" table
INSERT INTO coustomer (coustomer_id, name, email) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com'),
(3, 'Alice Johnson', 'alice.johnson@example.com'),
(4, 'Bob Brown', 'bob.brown@example.com'),
(5, 'Emily Davis', 'emily.davis@example.com');

-- Inserting data into the "order" table
INSERT INTO "order" (order_id, coustomer_id, name, order_date, total_amount) VALUES
(1, 1, 'Order 1', '2024-02-15', 150.00),
(2, 1, 'Order 2', '2024-02-28', 200.50),
(3, 2, 'Order 3', '2024-02-20', 75.25),
(4, 3, 'Order 4', '2024-03-01', 300.00),
(5, 4, 'Order 5', '2024-02-10', 125.75),
(6, 5, 'Order 6', '2024-03-02', 80.00),
(7, 1, 'Order 7', '2024-03-01', 210.00),
(8, 2, 'Order 8', '2024-02-25', 150.50),
(9, 3, 'Order 9', '2024-02-29', 180.25),
(10, 4, 'Order 10', '2024-02-22', 90.75);

SELECT order_date,coustomer.name,"order".name,total_amount from coustomer
    JOIN "order" ON coustomer.coustomer_id = "order".order_id -- its like get the data where cId and oId matched, only return them other will not,

SELECT order_date,c.name,o.name,total_amount from coustomer c
    JOIN "order" o ON c.coustomer_id = o.order_id -- same thing just used name alias


CREATE VIEW  join_order_coustomer AS
 SELECT 'name' from "order" 

SELECT * from  join_order_coustomer

DROP VIEW IF EXISTS join_order_customer;













