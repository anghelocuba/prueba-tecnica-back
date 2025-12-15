// seguridad/src/index.js
const Hapi = require('@hapi/hapi');
const path = require('path');
// Importa las rutas (las crearemos en el siguiente paso)
const securityRoutes = require('./routes/security.routes'); 
// Carga las variables de entorno si no usas el -r dotenv/config
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') }); 

const init = async () => {
    const server = Hapi.server({
        port: process.env.SECURITY_PORT || 3000,
        host: '0.0.0.0', // Es bueno usar 0.0.0.0 para contenedores
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

// Manejo de errores de inicio
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();