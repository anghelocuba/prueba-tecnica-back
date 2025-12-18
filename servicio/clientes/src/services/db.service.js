const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

//parametros para conectar a la bd
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost', 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//inicializamos la base de datos
const inicializarDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos exitosa.');        

        connection.release();
    } catch (error) {
        console.error('Error crítico al conectar a la base de datos:', error.message);
        process.exit(1); 
    }
};

module.exports = {
    pool,
    inicializarDB
};