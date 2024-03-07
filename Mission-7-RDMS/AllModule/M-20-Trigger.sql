-- Active: 1708939592559@@127.0.0.1@5432@ph
-- Active: 1699467625194@@127.0.0.1@5432@ph@public

/*
A trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions. 
*/

-- Table-Level Events:
    -- INSERT, UPDATE, DELETE, TRUNCATE
-- Database-Level Events
    -- Database Startup, Database Shutdown, Connection start and end etc

-- CREATE TRIGGER trigger_name
-- {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
-- ON table_name
-- [FOR EACH ROW] 
-- EXECUTE FUNCTION function_name();



CREATE Table my_users
(
    user_name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO my_users VALUES('Mezba', 'mezba@mail.com'), ('Mir', 'mir@mail.com');

SELECT * from my_users;
SELECT * from deleted_users_audit;

CREATE Table deleted_users_audit
(
    deleted_user_name VARCHAR(50),
    deletedAt TIMESTAMP
)

-- trigger
CREATE or REPLACE Function save_deleted_user()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
    BEGIN
        INSERT INTO deleted_users_audit VALUES(OLD.user_name, now());-- old cz it's deleted
        RAISE NOTICE 'Deleted user audit log created';
        RETURN OLD;
    END
$$



CREATE or REPLACE Trigger save_deleted_user_trigger -- TRIGGER name
BEFORE DELETE -- action
on my_users -- target table
FOR EACH ROW -- for every row
EXECUTE FUNCTION save_deleted_user(); -- execuation fn

DELETE from my_users WHERE user_name = 'Mir';

------------------------ INDEX --------------


-- Active: 1699467625194@@127.0.0.1@5432@ph2@public

SELECT * from  employees;


EXPLAIN ANALYSE
SELECT * from employees2 WHERE employee_id = '4';

CREATE INDEX idx_employees_last_name -- index name
on employees2 (last_name); --- table and COLUMN name

SHOW data_directory;-- data stored LOCATION