const { Pool } = require('pg');
const config = require('./db.config');

const pool = new Pool({
    host: config.dbConfig.HOST,
    user: config.dbConfig.DB_USER,
    password: config.dbConfig.DB_PASSWORD,
    database: config.dbConfig.DATABASE_NAME,
    port: config.dbConfig.DB_PORT
});

pool.connect()
    .then(() => console.log('Database connected succeefully!'))
    .catch((error) => console.log('db-connect-error :-> ', error))

module.exports = pool;