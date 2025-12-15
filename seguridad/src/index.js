const Hapi = require('@hapi/hapi');
const path = require('path');
const securityRoutes = require('./routes/security.routes'); 
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') }); 

const init = async () => {
    const server = Hapi.server({
        port: process.env.SECURITY_PORT || 3000,
        host: '0.0.0.0', 
        routes: {
            cors: {
                origin: ['http://localhost:4200'], 
                additionalHeaders: ['content-type'],
            }
        }
    });

    server.route(securityRoutes);

    await server.start();
    console.log(`Microservicio de Seguridad corriendo en: ${server.info.uri}`);
};

process.on('handler', (err) => {
    console.log(err);
    process.exit(1);
});

init();