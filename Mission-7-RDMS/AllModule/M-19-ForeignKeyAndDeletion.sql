-- Active: 1708939592559@@127.0.0.1@5432@ph


CREATE Table "user" (-- "user" cz there are user reserved key name which cannot use as table name
    id SERIAL PRIMARY KEY,
    userName VARCHAR(25) NOT NULL
)

CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id)
)


INSERT INTO "user" (userName) VALUES ('akash'),('batash'),('sagor'),('nodi'),('pahad')

SELECT * from "user"

INSERT INTO post (title,user_id)  VALUES
    ('this is my post 1',2),
    ('this is my post 2',1),
    ('this is my post 3',4),
    ('this is my post 4',3)
    -- ('this is my post 4',null) not possiable to null cz constraing updated below

 SELECT * FROM post

 ALTER Table post 
    alter COLUMN user_id set NOT NULL



----------------------- Delete a post which is a FOREIGN key REFERENCES, or delete a user which have a post using the user PRIMARY KEY -----------::->

-- 1.Deletion constraint on DELETE USER


-- 2.RESTRICT Deleteion -> on DELETE RESTRICT / on DELETE no ACTION (default)
DELETE FROM "user"
    WHERE id = 4 -- DEFAULT is violet cz this user has FOREIGN key COLUMN exists


-- 3.Cascading Deletion -> on DELETE CASCADE
DROP TABLE "user"

DROP TABLE post

CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE--ON DELETE CASCADE constraint added
)

-- Now it will run ,it will delete all REFERENCES key COLUMN of this user where ever used it. like post also will be delete within user
DELETE FROM "user"
    WHERE id = 5 


-- 4.Setting NULL -> on DELETE set NULL
CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE set NULL -- if the user deleted then their foreign key will be NULL,
)


-- 5.set DEFAULT VALUE -> on DELETE set DEFAULT
CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE set DEFAULT DEFAULT 2 -- if FOREIGN KEY not provided or FOREIGN KEY user deleted then it will set DEFAULT 2
)

DELETE FROM "user"
    WHERE id = 3

SELECT * FROM post


