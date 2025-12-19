const Hapi = require('@hapi/hapi');
const path = require('path');

const { inicializarDB } = require('./services/db.service'); 
const { conectarRedis, cargarRedis } = require('./services/redis.service');
const { conectarRabbit } = require('./services/rabbit.service');
const clientRoutes = require('./routes/cliente.routes'); 

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') }); 

const init = async () => {
// inicializamos servicios
try {
    console.log("--- Inicializando Servicios de Infraestructura ---");
    
    await inicializarDB(); 
    await conectarRedis();    
    await cargarRedis(); 
    await conectarRabbit();    
        
    console.log("servicios de infraestructura inicializados correctamente.");

} catch (error) {
    console.error('fallo crítico al inicializar los servicios:', error.message);
    process.exit(1); 
}

//inciamos servidor
    const server = Hapi.server({
        port: process.env.CLIENT_PORT || 3002, 
        host: process.env.APP_HOST || '0.0.0.0', 
        routes: { 
            cors: { 
                origin: ['http://localhost', 'http://127.0.0.1', 'http://localhost:4200'], 
                additionalHeaders: ['content-type', 'authorization'],
                credentials: true, 
            }
        } 
    });
    
    //registrar las rutas
    server.route(clientRoutes);

await server.start();
 console.log(`microservicio de Clientes corriendo en: ${server.info.uri}`);
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