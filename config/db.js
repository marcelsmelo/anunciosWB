module.exports = {
    /**
     * Docker
     */

    // username: process.env.DB_USER || 'ifeirinha',
    // password: process.env.DB_PASSWORD || '2c5P)hdwWR9.F',
    // database: process.env.DB_NAME || 'ifeirinha',
    // host: process.env.DB_HOST || 'mysql835.umbler.com',
    // dialect: process.env.DBDIALECT || 'mysql',
    // port: process.env.DB_PORT || 41890

    /**
     * Production Umbler
     */
    // username: 'anuncios',
    // password: 'Zxkx+47QWE|c6',
    // database: 'anunciosdb',
    // host: 'mysql247.umbler.com',
    // dialect:'mysql',
    // port: 41890


    /**
     * Localhost
     */
     username: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     host: process.env.DB_HOST,
     dialect:process.env.DB_DIALECT,
     port: process.env.DB_PORT
}
