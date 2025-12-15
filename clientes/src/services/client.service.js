const rabbitService = require('./rabbit.service');
// Asume que tienes un servicio de conexión a Redis (redis.service)
const { getParameter } = require('./redis.service'); 
const axios = require('axios'); // Para llamar al Microservicio de Seguridad (HTTP client)

// Simulación de guardar en la DB de clientes
const dbClient = {
    saveClient: (clientData) => {
        console.log(`[Clientes] Cliente ${clientData.nombres} registrado en DB.`);
        // En un entorno real: INSERT INTO clientes (...)
        return { id: Math.floor(Math.random() * 1000) };
    }
};

const SECURITY_MS_URL = 'http://localhost:3000'; 
// Si usas Docker Compose, esta URL será: 'http://security-ms:3000'

const registerClient = async (clientData) => {
    const { token, nombres, email } = clientData;

    // 1. 🔑 Validar Token con el Microservicio de Seguridad (HTTP Call)
    console.log(`[Clientes] Validando token: ${token}`);
    let tokenValid = false;
    try {
        const validationResponse = await axios.post(`${SECURITY_MS_URL}/api/security/validate-token`, { token });
        tokenValid = validationResponse.data.valid;
    } catch (e) {
        throw { statusCode: 503, message: 'Error al comunicarse con Microservicio de Seguridad' };
    }

    if (!tokenValid) {
        throw { statusCode: 401, message: 'Token de seguridad inválido o expirado.' };
    }

    // 2. 💾 Registrar Cliente en la Base de Datos
    const clientRecord = dbClient.saveClient(clientData);

    // 3. 💌 Consultar Redis para Envío de Correo (Requisito)
    const sendEmailParam = getParameter('SEND_WELCOME_EMAIL'); // Asume que Redis está configurado

    if (sendEmailParam === 'true') { // Solo envía si el parámetro está activo
        console.log(`[Clientes] Parámetro de correo activo. Enviando mensaje a RabbitMQ.`);
        
        // 4. 🐇 Enviar Orden de Correo a RabbitMQ (Requisito)
        const emailPayload = {
            clientId: clientRecord.id,
            clientName: nombres,
            clientEmail: email,
            subject: 'Bienvenido a nuestro servicio'
        };
        await rabbitService.publishEmailOrder(emailPayload);
    } else {
        console.log(`[Clientes] Parámetro de correo inactivo. No se envía mensaje.`);
    }

    return { 
        clientId: clientRecord.id, 
        emailSentOrder: sendEmailParam === 'true' 
    };
};

module.exports = {
    registerClient
};