const { Pool } = require('pg');

// Connection to Auth Database
const authPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_AUTH,
    port: process.env.DB_PORT, 
});

// Connection to Shop Database
const shopPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_SHOP,
    port: process.env.DB_PORT,
});

module.exports = {
    authDB: authPool,
    shopDB: shopPool
};