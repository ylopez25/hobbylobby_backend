DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name varchar(255),
    city_name varchar(255),
    city_id integer,
    first_name varchar(255),
    last_name varchar(255),
    pic text,
    skill varchar(255)
);

CREATE TABLE photos(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    photo text
);

CREATE INDEX photos_user_id ON photos(user_id)

