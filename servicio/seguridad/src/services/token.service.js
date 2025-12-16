const { pool } = require('./db.service');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 

require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET_KEY || '4144@aset#$';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRATION_TIME || '5m';


/**
 * * @param {object} [payload={}] 
 * @returns {string} 
 */
const generarToken = async (payload = {}) => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        jwtid: crypto.randomBytes(16).toString('hex') 
    });
    const query = 'INSERT INTO tokens (token) VALUES (?)';
    
    try {
        await pool.query(query, [token]);
        console.log(`JWT generado y guardado. Expira en ${JWT_EXPIRES_IN}.`);
        return token;
    } catch (error) {
        console.error('Error al guardar el JWT:', error.message);
        throw new Error('Fallo en la generación y guardado del token.');
    }
};

/**
 * * @param {string} token
 * @returns {boolean} 
 */
const validarToken = async (token) => {
    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET);
        console.log(`JWT verificado exitosamente. Payload:`, payload);
    } catch (e) {
        console.log(`JWT falló la verificación: ${e.name}`);
        return false;
    }

    const query = 'SELECT is_valid FROM tokens WHERE token = ? AND is_valid = TRUE';
    
    try {
        const [rows] = await pool.query(query, [token]);
        
        if (rows.length > 0) {
            console.log(`Token ${token} validado en DB.`);
            return true;
        }       
        console.log(`Token ${token} no encontrado o inválido en DB.`);
        return false;
    } catch (error) {
        console.error('Error al consultar DB para validar token:', error.message);
        return false;
    }
};

module.exports = {
    generarToken,
    validarToken,
};