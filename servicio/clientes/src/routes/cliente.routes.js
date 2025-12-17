const clientService = require('../services/cliente.service');

module.exports = [
    {
        method: 'POST',
        path: '/api/clientes/registrar',
        handler: async (request, h) => {
            try {
                const clientData = request.payload;
                const result = await clientService.registrarCliente(clientData);
                
                return h.response({ 
                    message: 'Cliente registrado exitosamente', 
                    details: result 
                }).code(201);
            } catch (error) {
                return h.response({ 
                    message: error.message || 'Error interno del servidor' 
                }).code(error.statusCode || 500);
            }
        }
    }
];