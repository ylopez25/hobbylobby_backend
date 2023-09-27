DROP TABLE IF EXISTS photodump;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username varchar(255),
    city varchar(255),
    firstName varchar(255),
    lastName varchar(255),
    pic text,
    skill varchar(255)
);

CREATE TABLE photodump (
    id SERIAL PRIMARY KEY,
    userId integer REFERENCES users(id) ON DELETE CASCADE,
    photo text
);

CREATE INDEX photodump_userId ON photodump(userId)