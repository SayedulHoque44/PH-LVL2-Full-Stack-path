-- Active: 1708939592559@@127.0.0.1@5432@ph

SELECT * FROM employees2

SELECT count(*) FROM employees2

--------------------
CREATE Function emp_count() --define fn
RETURNS INT -- define return TYPE
LANGUAGE SQL -- define LANGUAGE TYPE
AS
$$
    SELECT count(*) FROM employees2
$$

SELECT emp_count()

---------------
CREATE Function delete_emp() --define fn
RETURNS void -- define return TYPE
LANGUAGE SQL -- define LANGUAGE TYPE
AS
$$
    DELETE FROM employees2 WHERE employee_id = 30
$$

SELECT delete_emp()

-------------------


CREATE Function delete_emp_by_id(emp_id INT) --define fn
RETURNS void -- define return TYPE
LANGUAGE SQL -- define LANGUAGE TYPE
AS
$$
    DELETE FROM employees2 WHERE employee_id = emp_id
$$

SELECT delete_emp_by_id(25)

-- FUNCTION and PROCEDURE diffrence -> FUNCTION will RETURN somthing, PROCEDURE will do somthing but never RETURN. 

 ------------------------- Procudure --------------
CREATE PROCEDURE remove_emp()
LANGUAGE plpgsql -- plpgsql give us some extra features
AS
$$
    BEGIN
        SELECT employee_id INTO test_var FROM employees2 WHERE employee_id = 26; --insert the VALUE in the varriable
        DELETE FROM employees2 WHERE employee_id = employee_id;
    END
$$

CALL remove_emp() -- CALL

-------------

CREATE PROCEDURE remove_emp_var()
LANGUAGE plpgsql -- plpgsql give us some extra features
AS
$$
    DECLARE -- we can define varriable here 
    test_var INT;
    BEGIN
        SELECT employee_id INTO test_var FROM employees2 WHERE employee_id = 26; --insert the VALUE in the varriable
        DELETE FROM employees2 WHERE employee_id = test_var;

        RAISE NOTICE 'EMP Deleted Success!';
    END
$$

CALL remove_emp_var() -- CALL
