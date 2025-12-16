const Hapi = require('@hapi/hapi');
const { initializeDatabase } = require('./services/db.service');
const securityRoutes = require('./routes/seguridad.routes'); 

const init = async () => {
    await initializeDatabase(); 

    const server = Hapi.server({
        port: process.env.SECURITY_PORT || 3001,
        host: process.env.APP_HOST,      
    });

    server.route(securityRoutes);

    await server.start();
    console.log(`Microservicio de Seguridad corriendo en ${server.info.uri}`);
};

process.on('handler', (err) => {
    console.log(err);
    process.exit(1);
});

init();