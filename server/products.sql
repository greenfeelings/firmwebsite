DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL CHECK (name !=''),
  description VARCHAR NOT NULL CHECK (description !=''),
  price VARCHAR NOT NULL CHECK (price !=''),
  url TEXT,
  quantity INTEGER 
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL CHECK (name !=''),
  description VARCHAR NOT NULL CHECK (description !=''),
  price VARCHAR NOT NULL CHECK (price !=''),
  url TEXT,
  quantity INTEGER 
);