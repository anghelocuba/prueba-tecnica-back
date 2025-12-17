const amqp = require('amqplib'); 

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost'; 
const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}`;
const QUEUE_NAME = 'email_queue'; 

let channel = null;
let connection = null;

const conectarRabbit = async () => {
    try {
        if (connection && channel) return;
        
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log('rabbitMQ  conectada');
        
    } catch (error) {
        console.error('Error RabbitMQ:', error.message);
        setTimeout(conectarRabbit, 5000); 
    }
};

const subirCorreoCola = async (payload) => {
    console.log("payload")
        console.log(payload)

    if (!channel) {
        await conectarRabbit();
        if (!channel) throw new Error('RabbitMQ no disponible.');
    }

    try {
        const message = JSON.stringify(payload);
        console.log("message")
        console.log(message)
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        console.log(`mensaje publicado en ${QUEUE_NAME}`);
    } catch (error) {
        console.error('error al publicar:', error.message);
    }
};

module.exports = { subirCorreoCola, conectarRabbit };