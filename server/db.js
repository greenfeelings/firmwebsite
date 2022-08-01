/* ----------------------------------------------------------------------------------------------------------
                                        Setup
------------------------------------------------------------------------------------------------------------*/

const spicedPg = require("spiced-pg");
//below we have info that we need for our db connection

//1. which db do we talk to?
const database = "firmproducts";
//2. which user is running our queries in the db
const username = "postgres";
//3. whats the user password
const password = "postgres";
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

/* ----------------------------------------------------------------------------------------------------------
                                        Products
------------------------------------------------------------------------------------------------------------*/

module.exports.registerProduct = (name, description, price, url, quantity) => {
    const q = `INSERT INTO products (name, description, price, url,
        quantity) VALUES($1, $2, $3, $4, $5)
    RETURNING id`;
    const param = [name, description, price, url, quantity];
    return db.query(q, param);
};

module.exports.findProduct = () => {
    const q = `SELECT id, name, description, price, url FROM products LIMIT 6`;
    const param = [];
    return db.query(q, param);
};

module.exports.showProducts = (val) => {
    return db.query(
        `SELECT id, name, url FROM products WHERE first ILIKE $1 LIMIT 5`,
        [val + "%"]
    );
};

module.exports.addImage = (url, id) => {
    const q = `UPDATE products 
    SET url = $1
    WHERE id = $2
    RETURNING url`;
    const param = [url, id];
    return db.query(q, param);
};

module.exports.getModal = (id) => {
    const q = `SELECT * FROM images WHERE id = $1`;
    const param = [id];
    return db.query(q, param);
};
