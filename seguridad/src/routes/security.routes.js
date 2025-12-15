const tokenService = require('../services/token.service');

module.exports = [
    {
        method: 'GET',
        path: '/api/security/generate-token',
        handler: (request, h) => {
            const token = tokenService.generateAndSaveToken();
            return { token }; 
        }
    },
    {
        method: 'POST',
        path: '/api/security/validate-token',
        handler: (request, h) => {
            const { token } = request.payload;
            const isValid = tokenService.validateToken(token);
            return { valid: isValid }; 
        }
    }
];