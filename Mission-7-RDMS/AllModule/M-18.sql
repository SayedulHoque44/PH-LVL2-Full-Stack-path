-- Active: 1708939592559@@127.0.0.1@5432@ph
SELECT * FROM person

------------------- ALTER -----------------
--  define column type and constrain
ALTER Table person
    ADD COLUMN email VARCHAR(25) DEFAULT 'default@gmail.com' NOT NULL;

-- delete a COLUMN
ALTER TABLE person
    DROP  COLUMN email; 

-- insert table value
INSERT INTO person VALUES(4,'user4','gg4','al4',29,'userEmail@gmail.com')

-- update column name
ALTER Table person 
    RENAME COLUMN age to user_age

-- update column type
ALTER  TABLE person
   alter COLUMN user_name TYPE VARCHAR(50);

--  update column constrain
ALTER TABLE person
    ALTER COLUMN user_name set NOT NULL;
    

------------- SELECT ----------------

CREATE Table students (
    studen_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    course VARCHAR(50),
    grade VARCHAR(3),
    email VARCHAR(50),
    dob DATE,
    blood_group VARCHAR(5),
    country VARCHAR(20)
)

DROP Table students

INSERT INTO students (first_name, last_name, age, course, grade, email, dob, blood_group, country) 
VALUES 
('John', 'Doe', 20, 'Computer Science', 'A', 'john.doe@example.com', '2004-05-10', 'O+', 'USA'),
('Alice', 'Smith', 22, 'Mathematics', 'B+', 'alice.smith@example.com', '2002-09-15', 'AB-', 'Canada'),
('Michael', 'Johnson', 21, 'Physics', 'A-', 'michael.johnson@example.com', '2003-03-20', 'A+', 'UK'),
('Emily', 'Brown', 19, 'Biology', 'B', 'emily.brown@example.com', '2005-01-25', 'B-', 'Australia'),
('Daniel', 'Martinez', 23, 'Chemistry', 'A+', 'daniel.martinez@example.com', '2001-11-30', 'O-', 'Spain'),
('Sophia', 'Anderson', 20, 'History', 'B+', 'sophia.anderson@example.com', '2004-07-05', 'AB+', 'Germany'),
('James', 'Wilson', 22, 'English', 'A-', 'james.wilson@example.com', '2002-08-12', 'A-', 'France'),
('Olivia', 'Taylor', 21, 'Art', 'B', 'olivia.taylor@example.com', '2003-04-18', 'B+', 'Italy'),
('William', 'Thomas', 20, 'Geography', 'A', 'william.thomas@example.com', '2004-06-22', 'O+', 'Japan'),
('Emma', 'Jones', 22, 'Economics', 'B-', 'emma.jones@example.com', '2002-10-28', 'AB-', 'Brazil'),
('Alexander', 'White', 19, 'Psychology', 'B+', 'alexander.white@example.com', '2005-02-14', 'A+', 'Mexico'),
('Mia', 'Hall', 23, 'Sociology', 'A', 'mia.hall@example.com', '2001-12-19', 'B-', 'Argentina'),
('Ethan', 'Brown', 20, 'Political Science', 'A-', 'ethan.brown@example.com', '2004-08-24', 'AB-', 'South Africa'),
('Charlotte', 'Garcia', 21, 'Engineering', 'B', 'charlotte.garcia@example.com', '2003-05-30', 'O-', 'China'),
('Benjamin', 'Lopez', 22, 'Music', 'A+', 'benjamin.lopez@example.com', '2002-11-05', 'AB+', 'India'),
('Amelia', 'Lee', 19, 'Philosophy', 'B+', 'amelia.lee@example.com', '2005-03-10', 'A-', 'Russia'),
('Henry', 'Harris', 23, 'Anthropology', 'A-', 'henry.harris@example.com', '2001-01-15', 'B+', 'Nigeria'),
('Evelyn', 'Clark', 20, 'Linguistics', 'B-', 'evelyn.clark@example.com', '2004-09-20', 'AB+', 'South Korea'),
('Liam', 'Lewis', 22, 'Communications', 'A', 'liam.lewis@example.com', '2002-12-25', 'O-', 'Germany'),
('Ava', 'Walker', 21, 'Theater', 'B+', 'ava.walker@example.com', '2003-06-30', 'A+', 'France');




SELECT * FROM students

SELECT email FROM students

SELECT email,age FROM students

SELECT first_name as userName FROM students

SELECT age FROM students ORDER BY age DESC

SELECT age FROM students ORDER BY age ASC

TRUNCATE TABLE students -- TRUNCATE means delete all data but table struture will exits

SELECT DISTINCT first_name from students -- DISTINCT means in the first_name column how many UNIQUE value EXISTS

SELECT * FROM students WHERE age = 23 -- where for use CONDITION

SELECT * FROM students WHERE age = 23 and blood_group ='B+' -- multiple condition ADD

SELECT * FROM students WHERE (first_name='sayed' OR last_name='hoq') and (age=23 OR age = 26)

SELECT * FROM students WHERE age <>26 -- != / <>

SELECT * FROM students 
    WHERE NOT age = 26 -- NOT EQUALS


------------ Module 18 mission-6 ----- SCALAR and AGGREGATE FUNCTION
    /*
        1.SCALAR FUNCTION : this FUNCTION will call for every row and return a value, that's mean if there 5 row this fn will call times and return every call,and that's call and return value will independent from each other.ph

    	2.AGGREGATE FUNCTION : this function will execute with muliple row but it will return a single value return after perform a process.
    */

---------- SCALER -----------

SELECT upper(first_name)  from students -- show first name convert uppercase

SELECT upper(first_name) as first_name_upperCase, *  from students -- show first name convert uppercase with ALL

SELECT concat(first_name,' ',last_name) FROM students -- concating column

SELECT length(first_name) as first_name_length,* FROM students


-------- AGGREGATE FUNCTION ----------

SELECT avg(age) FROM students -- take all set of student and return single value of avrage age

SELECT max(age) FROM students

SELECT min(age) FROM students

SELECT sum(age) FROM students

SELECT count(*) FROM students -- how many row in this relation

-- SCALER and AGGREGATE mix

SELECT max(length(first_name)) FROM students

SELECT * FROM students
    WHERE email IS NOT NULL -- handle null value

SELECT COALESCE(email,'email not provided')as "Email",first_name,age FROM students -- DEFAULT will be email not provided if got any NULL

SELECT * from students WHERE country = 'USA' or country = 'Italy'

-- ----------- IN, NOT IN, BETWEEN, LIKE, ILIKE ---------
SELECT * from students WHERE country IN('USA','Italy') -- we can use in instade of 138 line way,

SELECT * from students WHERE country NOT IN('USA','Italy') 

SELECT * from students WHERE age BETWEEN 18 AND 20 -- for range in age

SELECT * from students WHERE dob BETWEEN '2003-01-01' AND '2004-12-30' ORDER BY dob -- for range in date 

SELECT * FROM students 
    WHERE first_name LIKE '%te' -- get where  CHARACTER ended with 'te'

SELECT * FROM students 
    WHERE first_name LIKE 'Ch%' -- get where  CHARACTER started with 'Ch'

SELECT * FROM students 
    WHERE first_name LIKE '__a' -- means two underscore means skip 2 char after char will be a, if match then return

SELECT * FROM students 
    WHERE first_name ILIKE 'a%' -- same as LIKE but for caseInSensative



---- Pagination -> LIMIT

SELECT * FROM students ORDER BY student_id  LIMIT 5 OFFSET 5*1  -- OFFSET as SKIP , Limit -> OFFSET * page

DELETE FROM students
    WHERE country = 'USA' OR country = 'Canada'


--------- Update --------------------

UPDATE students 
    set email = 'sayed@gmail.com',first_name = 'sayed'
        WHERE student_id = 68


ALTER TABLE students
    RENAME COLUMN studen_id to student_id -- update COLUMN name









