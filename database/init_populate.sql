-- Populating Users table
INSERT INTO Users (name, username, email, address)
VALUES
    ('John Doe', 'johndoe', 'johndoe@example.com', '123 Main St'),
    ('Jane Smith', 'janesmith', 'janesmith@example.com', '456 Elm St'),
    ('Michael Johnson', 'michaelj', 'michaelj@example.com', '789 Oak St'),
    ('Sarah Wilson', 'sarahw', 'sarahw@example.com', '321 Maple Ave'),
    ('David Brown', 'davidb', 'davidb@example.com', '987 Pine St'),
    ('Emily Davis', 'emilyd', 'emilyd@example.com', '654 Cedar Rd'),
    ('James Lee', 'jamesl', 'jamesl@example.com', '788 Pine St'),
    ('Jessica Thomas', 'jessicat', 'jessicat@example.com', '457 Elm St'),
    ('Daniel Clark', 'danielc', 'danielc@example.com', '124 Main St'),
    ('Olivia Anderson', 'oliviaa', 'oliviaa@example.com', '988 Pine St');

-- Populating Passwords table
INSERT INTO Passwords (userId, password)
VALUES
    (1, 'password1'),
    (2, 'password2'),
    (3, 'password3'),
    (4, 'password4'),
    (5, 'password5'),
    (6, 'password6'),
    (7, 'password7'),
    (8, 'password8'),
    (9, 'password9'),
    (10, 'password10');

-- Creating Posts for each user
INSERT INTO Posts (userId, title, body)
    SELECT id, 'Introduction to SQL' AS title, 'SQL is a powerful language used for managing and manipulating relational databases.' AS body FROM Users;
INSERT INTO Posts (userId, title, body)
    SELECT id, 'Understanding SQL Joins' AS title, 'SQL joins are fundamental for combining data from multiple tables in a database.' AS body FROM Users;
INSERT INTO Posts (userId, title, body)
    SELECT id, 'Advanced SQL Techniques' AS title, 'Explore advanced SQL techniques such as subqueries, window functions, and stored procedures.' AS body FROM Users;

-- Creating Comments for each post
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "Great introduction to SQL! It's an essential skill for working with databases." AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "Understanding SQL joins is crucial for querying data from multiple tables. Thanks for explaining it!" AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "I'm eager to learn advanced SQL techniques like subqueries and window functions. Any recommendations?" AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "I found your post on SQL joins really helpful. Can you provide examples of different join types?" AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "The advanced SQL techniques you mentioned are quite powerful. I'm excited to explore them in more detail." AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "Do you have any recommendations for resources to learn advanced SQL techniques? I'm really interested!" AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "I appreciate your post on SQL. It has helped me gain a better understanding of database management." AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "Thanks for explaining SQL joins. They were a bit confusing for me, but now it's much clearer." AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "I've been using subqueries in my SQL queries, but I'm still trying to grasp the concept fully. Any tips?" AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
    
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, "Your post on advanced SQL techniques inspired me to dive deeper into SQL. Looking forward to your future posts!" AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;

-- Creating Todos for each user
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Learn SQL basic syntax' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Practice SQL queries with sample databases' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Build a simple CRUD application using SQL and a backend language' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Explore different types of SQL joins and their use cases' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Implement user authentication and authorization in a full-stack web application' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Create a database schema for a complex web application' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Optimize SQL queries for improved performance' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Learn a front-end framework (e.g., React, Vue, Angular) to complement SQL skills' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Master SQL subqueries and their various use cases' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Build a RESTful API using SQL and a backend framework' AS title, 0 AS completed FROM Users;

-- Creating Albums for each user
INSERT INTO Albums (userId, title)
SELECT u.id, CONCAT('Cat Album Number ', a.albumNum) AS title
FROM Users u
CROSS JOIN (
    SELECT ROW_NUMBER() OVER (ORDER BY t) AS albumNum
    FROM (
        SELECT 1 AS t UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
    ) tmp
) a
ORDER BY u.id, a.albumNum;

-- Creating Photos for each album
INSERT INTO Photos (albumId, title, url, thumbnailUrl)
SELECT a.id, CONCAT('Photo ', p.photoNum) AS title, CONCAT('https://placekitten.com/500/500?image=', p.photoNum) AS url, CONCAT('https://placekitten.com/500/500?image=', p.photoNum) AS thumbnailUrl
FROM Albums a
CROSS JOIN (
    SELECT ROW_NUMBER() OVER (ORDER BY t) AS photoNum
    FROM (
        SELECT 1 AS t UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL
        SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL
        SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16
    ) tmp
) p
ORDER BY a.id, p.photoNum;
