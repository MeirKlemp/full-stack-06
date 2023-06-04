-- Populating Users table
INSERT INTO Users (name, username, email)
VALUES
    ('John Doe', 'johndoe', 'johndoe@example.com'),
    ('Jane Smith', 'janesmith', 'janesmith@example.com'),
    ('Michael Johnson', 'michaelj', 'michaelj@example.com'),
    ('Sarah Wilson', 'sarahw', 'sarahw@example.com'),
    ('David Brown', 'davidb', 'davidb@example.com'),
    ('Emily Davis', 'emilyd', 'emilyd@example.com'),
    ('James Lee', 'jamesl', 'jamesl@example.com'),
    ('Jessica Thomas', 'jessicat', 'jessicat@example.com'),
    ('Daniel Clark', 'danielc', 'danielc@example.com'),
    ('Olivia Anderson', 'oliviaa', 'oliviaa@example.com');

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
    SELECT id, 'Post 1' AS title, 'Body of post 1' AS body FROM Users;
INSERT INTO Posts (userId, title, body)
    SELECT id, 'Post 2' AS title, 'Body of post 2' AS body FROM Users;
INSERT INTO Posts (userId, title, body)
    SELECT id, 'Post 3' AS title, 'Body of post 3' AS body FROM Users;

-- Creating Comments for each post
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 1' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 2' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 3' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 4' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 5' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 6' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 7' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 8' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 9' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;
INSERT INTO Comments (postId, body, userId)
    SELECT p.id, 'Comment 10' AS body, u.id AS userId
    FROM Posts p
    INNER JOIN Users u ON u.id = p.userId;

-- Creating Todos for each user
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 1' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 2' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 3' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 4' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 5' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 6' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 7' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 8' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 9' AS title, 0 AS completed FROM Users;
INSERT INTO Todos (userId, title, completed)
    SELECT id, 'Todo 10' AS title, 0 AS completed FROM Users;
