const clientService = require('../services/client.service');
// Podrías usar Joi para validar el payload aquí si quieres validación del lado del servidor

module.exports = [
    {
        method: 'POST',
        path: '/api/clientes/register',
        handler: async (request, h) => {
            try {
                const clientData = request.payload;
                const result = await clientService.registerClient(clientData);
                
                // Respuesta que el frontend espera
                return h.response({ 
                    message: 'Cliente registrado exitosamente', 
                    details: result 
                }).code(201);
            } catch (error) {
                // Manejo de errores de negocio o servicio
                return h.response({ 
                    message: error.message || 'Error interno del servidor' 
                }).code(error.statusCode || 500);
            }
        }
    }
];