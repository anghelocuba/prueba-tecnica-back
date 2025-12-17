const { pool } = require('./db.service');

const registrarCorreo = async (data) => {
    const query = `
        INSERT INTO correos (
            id_cliente, 
            email_destino, 
            asunto, 
            estado_envio, 
            user_registro, 
            ip_registro
        )
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const values = [
        data.clientId,              
        data.clientEmail,          
        data.subject,              
        'enviado',                
        'admin',         
        '127.0.0.1'                
    ];

    try {
        const [result] = await pool.query(query, values);
        console.log('Registro exitoso');
    } catch (error) {
      
            console.error('Error al insertar en tabla correos:', error.message);
        
    }
};

module.exports = { registrarCorreo };