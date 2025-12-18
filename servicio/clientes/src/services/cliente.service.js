const { subirCorreoCola } = require('./rabbit.service');
const { getParam } = require('./redis.service'); 
const axios = require('axios');
const { pool } = require('./db.service'); 

const SECURITY_MS_URL = process.env.SECURITY_MS_URL || 'http://127.0.0.1:3001';

const registrarCliente = async (clientData) => {
    const { token, nombres, apellidos, email } = clientData;

    //validamos token
    try {      
        const validation = await axios.post(`${SECURITY_MS_URL}/api/seguridad/validar-token`, { token });
        if (!validation.data.valid) {
            throw { statusCode: 401, message: 'Token de seguridad inválido.' };
        }
    } catch (e) {
        console.error('Error Seguridad:', e.message);
        throw { statusCode: 503, message: 'Fallo al validar token' };
    }

    // guardamos al cliente
    const [result] = await pool.query(
        `INSERT INTO clientes (tipo_documento, nro_documento, nombres, apellidos, fecha_nacimiento, bono) VALUES (?, ?, ?, ?, ?, ?)`,
        [clientData.tipoDocumento, clientData.numeroDocumento, nombres, apellidos, clientData.fechaNacimiento, clientData.bono]
    );
    console.log("result")

    console.log(result)
    const clienteId = result.insertId;

    // consulta redis
    const enviarCorreo = await getParam('SEND_EMAIL');
    const emailHabilitado = String(enviarCorreo).trim().toLowerCase() === 'true';

    // Si está activo, enviar a RabbitMQ
    if (emailHabilitado) {
        const emailPayload = {
            clienteId,
            clienteNombre: `${nombres} ${apellidos}`,
            clienteEmail: email,
            subject: 'Bienvenido',
            body: `Hola ${nombres}, tu registro fue exitoso con ID: ${clienteId}`
        };
         console.log("emailPayload")
        console.log(emailPayload)
        await subirCorreoCola(emailPayload);
    }

    return { clienteId, message: 'Cliente registrado exitosamente', emailHabilitado: emailHabilitado };
};

module.exports = { registrarCliente };