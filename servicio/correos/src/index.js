const Hapi = require('@hapi/hapi');
const { inicializarDB } = require('./services/db.service');
const { iniciarConsumidor } = require('./services/rabbit.service'); 

const init = async () => {
    console.log("--- Microservicio de Correos Iniciando ---");
    await inicializarDB();
    const server = Hapi.server({
        port: process.env.EMAIL_PORT || 3003,
        host: process.env.APP_HOST,     
    });

    await server.start();

    console.log(`Servidor de correos en: ${server.info.uri}`);

    await iniciarConsumidor(); 
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