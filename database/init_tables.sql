CREATE TABLE `Passwords`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
CREATE TABLE `ApiKeys`(
    `apiKey` BINARY(16) NOT NULL PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL
);
ALTER TABLE
    `Users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE
    `Users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `Photos`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `albumId` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `thumbnailUrl` VARCHAR(255) NOT NULL
);
CREATE TABLE `Posts`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `body` VARCHAR(255) NOT NULL
);
CREATE TABLE `Comments`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `postId` BIGINT UNSIGNED NOT NULL,
    `body` VARCHAR(255) NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Todos`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `completed` TINYINT(1) NOT NULL
);
CREATE TABLE `Albums`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Albums` ADD CONSTRAINT `albums_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Comments` ADD CONSTRAINT `comments_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Comments` ADD CONSTRAINT `comments_postid_foreign` FOREIGN KEY(`postId`) REFERENCES `Posts`(`id`);
ALTER TABLE
    `Posts` ADD CONSTRAINT `posts_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Passwords` ADD CONSTRAINT `passwords_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
ALTER TABLE
    `ApiKeys` ADD CONSTRAINT `apikeys_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Photos` ADD CONSTRAINT `photos_albumid_foreign` FOREIGN KEY(`albumId`) REFERENCES `Albums`(`id`);
ALTER TABLE
    `Todos` ADD CONSTRAINT `todos_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
