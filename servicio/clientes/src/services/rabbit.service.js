const amqp = require('amqplib'); 
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME =  process.env.QUEUE_NAME; 

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