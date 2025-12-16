const tokenService = require('../services/token.service');

module.exports = [
    {
        method: 'GET',
        path: '/api/seguridad/generar-token',
        handler: async (request, h) => { 
            try {
                const token = await tokenService.generarToken();
                console.log("Token generado", token);
                return { token }; 
            } catch (error) {
                console.error("Error al generar token:", error);
                return h.response({ error: 'Fallo interno al generar el token' }).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/seguridad/validar-token',
        handler: async (request, h) => { 
            const { token } = request.payload;
            const isValid = await tokenService.validarToken(token); 
            
            return { valid: isValid }; 
        }
    }
];