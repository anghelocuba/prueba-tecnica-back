const Hapi = require('@hapi/hapi');
const { inicializarDB } = require('./services/db.service');
const securityRoutes = require('./routes/seguridad.routes'); 

const init = async () => {
    await inicializarDB(); 

    const server = Hapi.server({
        port: process.env.SECURITY_PORT || 3001,
        host: process.env.APP_HOST|| '0.0.0.0',
        routes: { 
            cors: { 
                origin: ['http://localhost', 'http://127.0.0.1', 'http://localhost:4200'], 
                additionalHeaders: ['content-type', 'authorization'],
                credentials: true, 
            }
        }     
    });

    server.route(securityRoutes);

    await server.start();
    console.log(`Microservicio de Seguridad corriendo en ${server.info.uri}`);
};

// Maneja errores de Promesas
process.on('unhandledRejection', (err) => {
    console.error(`Error de Promesa no manejada: ${err.message}`);
    process.exit(1);
});

// Maneja errores de código 
process.on('uncaughtException', (err) => {
    console.error(`Error de excepción no manejada: ${err.message}`);
    process.exit(1);
});

init();