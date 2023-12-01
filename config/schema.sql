-- file ini untuk menginisiasi database yg digunakan pada aplikasi ini

CREATE DATABASE IF NOT EXISTS
`msib_revou`;

USE `msib_revou`;

CREATE TABLE IF NOT EXISTS Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1000) NOT NULL,
    price INT NOT NULL,
    image_url TEXT,
    catalog_id INT,
    created_at DATE
);

CREATE TABLE IF NOT EXISTS Catalog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1000) NOT NULL
);

INSERT INTO Product (name, price, image_url, catalog_id, created_at)
VALUES ('Mirasoul Flight Unit', 132000, '',
1, '2023-11-30');

INSERT INTO Product (name, price, image_url, catalog_id, created_at)
VALUES ('Gundam Aerial', 320000, 'https://images.app.goo.gl/86M5MHV8HpyeUuYa8',
2, '2023-11-30');