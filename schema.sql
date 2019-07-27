DROP DATABASE IF EXISTS movies;

CREATE DATABASE movies;

USE movies;

CREATE TABLE info (
  title VARCHAR(30) NOT NULL PRIMARY KEY,
  runtime VARCHAR(4),
  year INT,
  IMDBrating NUMERIC,
  image VARCHAR(100),
  watched BOOLEAN
);