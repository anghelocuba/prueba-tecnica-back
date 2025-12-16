const mysql = require('mysql2/promise'); 
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

async function initializeDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Conexión a la base de datos exitosa.');        

    } catch (err) {
        console.error('Error al conectar o inicializar la base de datos:', err.message);
        process.exit(1); 
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


module.exports = {
    pool,
    initializeDatabase,
};