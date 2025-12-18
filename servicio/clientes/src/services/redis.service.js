const redis = require('redis'); 
const { pool } = require('./db.service');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const REDIS_HOST = process.env.REDIS_HOST; 
const REDIS_PORT = process.env.REDIS_PORT;

let cliente;

const conectarRedis = async () => {
    try {
        if (cliente && cliente.isOpen) return;

        cliente = redis.createClient({
            url: `redis://${REDIS_HOST}:${REDIS_PORT}`
        });

        cliente.on('error', (err) => console.error('error en cliente Redis:', err));
        
        await cliente.connect();
        console.log(`conexión establecida a Redis: ${REDIS_HOST}:${REDIS_PORT}`);

        await cargarRedis();

    } catch (error) {
        console.error(`fallo inicial al conectar a Redis (${REDIS_HOST}):`, error.message);
        console.log('Reintentando conexión a Redis en 5 segundos...');
        setTimeout(conectarRedis, 5000);
    }
};


//Carga los parámetros desde MySQL a Redis.
const cargarRedis = async () => {
    if (!cliente || !cliente.isOpen) {
        console.warn('cliente Redis no conectado. No se pudo cargar parámetros.');
        return;
    }

    try {
        const query = 'SELECT key_name, key_value FROM parametros_globales';
        const [rows] = await pool.query(query); 
        
        if (rows.length > 0) {
            for (const row of rows) {
                await cliente.set(row.key_name, row.key_value);
            }
            console.log(`se cargaron ${rows.length} parámetros desde la base de datos.`);
        } else {
            console.warn('la tabla parametros_globales está vacía. Usando valores por defecto...');
        }

    } catch (error) {
        console.error('error al leer MySQL, usando valores por defecto:', error.message);
    }
};


const getParam = async (key) => {
    if (!cliente || !cliente.isOpen) {
        console.warn(`Devolviendo 'false' para la llave: ${key}`);
        return 'false'; 
    }
    const value = await cliente.get(key);
    return value || 'false'; 
};

module.exports = {
    conectarRedis,
    getParam,
    cargarRedis
};