-- Active: 1708939592559@@127.0.0.1@5432@ph
CREATE Table "user" (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(25) NOT NULL
)

INSERT INTO "user" (userName) VALUES ('akash'),('batash'),('sagor'),('nodi'),('pahad')

CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE
)

INSERT INTO post (title,user_id)  VALUES
    -- ('this is my post 1',2),
    -- ('this is my post 2',1),
    -- ('this is my post 3',4),
    ('this is my post 5',NULL)

DROP Table "user"

DROP Table post


SELECT * FROM "user"

SELECT * from post


------------------------ JOIN -------------------------

SELECT title,userName FROM post
    JOIN "user" ON post.user_id = "user".id -- it's join the both TABLE

SELECT * FROM post
    JOIN "user" ON post.user_id = "user".id 

--when there joined muliple table with multiple id COLUMN
SELECT post.id FROM post
    JOIN "user" ON post.user_id = "user".id  -- post id

SELECT * FROM post as p
  INNER  JOIN "user" as u ON p.user_id = u.id  -- aliasing post as a, and this join is INNER JOIN
--INNER JOIN filterout those column which user_id is null ,like when join is happening the foreign key null not founded in the user table that's why it will filterout and also when join is happaing it only added the user column which are referenced with the post using foreign key, other will be not added.

--But if you want to show all the post with the join then you have to user left join and the taget table should be in the left side, below:

SELECT * FROM post as p
  LEFT JOIN "user" as u ON p.user_id = u.id -- but if you want to show all user table value then you have replace LEFT to RIGHT , cz  user in the right side

------------ FULL JOIN ----------------
-- it's like get full value of table of both side TABLE, and requirment filed will be NULL if not matched

SELECT * FROM post as p
  FULL JOIN "user" as u ON p.user_id = u.id

-- NATURAL JOIN - if there both table has column with the same value then it will show,and other will be filterout, there have to common column in the both table

SELECT * FROM post 
    NATURAL JOIN "user" -- in this time it will not perform as expected cz there no common column

------------------------ SUBQUERIES --------
SELECT avg(total_amount) FROM "order"  -- it has to be a single value 

SELECT * FROM "order" WHERE total_amount >(SELECT avg(total_amount) FROM "order" ) -- both query have to adjust able


