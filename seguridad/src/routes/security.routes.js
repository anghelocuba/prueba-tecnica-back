const tokenService = require('../services/token.service');

module.exports = [
    {
        // El frontend llama a este GET para inicializar el token
        method: 'GET',
        path: '/api/security/generate-token',
        handler: (request, h) => {
            const token = tokenService.generateAndSaveToken();
            // El frontend espera { token: '...' }
            return { token }; 
        }
    },
    {
        // El Microservicio de Clientes llama a este POST para validar el token
        method: 'POST',
        path: '/api/security/validate-token',
        handler: (request, h) => {
            const { token } = request.payload;
            const isValid = tokenService.validateToken(token);
            // El Microservicio de Clientes espera { valid: true/false }
            return { valid: isValid }; 
        }
    }
];