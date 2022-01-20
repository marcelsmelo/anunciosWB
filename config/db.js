//require('dotenv-safe').config();

module.exports = {
    /**
     * Local
     */

    username: process.env.DB_USER || process.env.DBUSERNAME,
    password: process.env.DB_PASSWORD || process.env.DBPASSWORD,
    database: process.env.DB_NAME || process.env.DBDATABASE,
    host: process.env.DB_HOST || process.env.DBHOST,
    dialect: process.env.DBDIALECT || 'mysql',
    port: process.env.DB_PORT || process.env.DBPORT
}