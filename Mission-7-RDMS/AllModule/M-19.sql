-- Active: 1708939592559@@127.0.0.1@5432@ph


--------------------- Date ---------------

-- SHOW timezone

SELECT now() -- TIMESTAMP

CREATE Table timeZ (ts TIMESTAMP without TIME zone, tsz TIMESTAMP with TIME zone)


INSERT INTO timez VALUES('2024-01-12 10:45:00','2024-01-12 10:45:00')

SELECT * from timez

SELECT CURRENT_DATE;

SELECT now()::date -- same as current date

SELECT now()::TIME

SELECT to_char(now(),'month') -- show customly date in string


SELECT CURRENT_DATE - INTERVAL '1 year 1 month' as fallBackTime -- get the date of before 1 year 

SELECT age(CURRENT_DATE,'2001-01-25') -- getting age gap using age SCALAR FUNCTION

SELECT *,age(current_date,dob) as STD_age from students

SELECT extract(YEAR from '2025-01-25'::date) -- get a year from a date -- ::date for type define

SELECT extract(MONTH from '2025-01-25'::date) -- get a year from a date

SELECT extract(DAY from '2025-01-25'::date) -- get a year from a date

SELECT 'f'::BOOLEAN -- in t/y/1 as true , f/n/0 as false in BOOLEAN


------------------------- AGGREGATE FUNCTION (GROUOP BY) --------------------
SELECT * from students

SELECT grade,count(*) from students -- then it will EXECUTE every group take as input multiple value and return single value
    GROUP BY grade -- at first it will group those same VALUE and split those with their group

SELECT grade,count(*) as total_std,avg(age) as avg_age_total FROM students -- here showing data group of student on grade and counting there total and in this group also giving how the avarage of this group age
    GROUP BY grade

-- filtaring -- HAVING is used as like WHERE but only for AGGREGATE fn
SELECT grade,count(*) as total_std,avg(age) as avg_age_total FROM students
    GROUP BY grade
        HAVING avg(age) >20.21 -- after the group executaion complete it will only return those group which are avg age is getter then 20.21,


-- how many student born in each gruoped year
SELECT extract(YEAR from dob) as birth_year,count(*) as stds_born
    from students
    GROUP BY birth_year


