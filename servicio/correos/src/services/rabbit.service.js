const amqp = require('amqplib');
const { registrarCorreo } = require('./email.service');

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

const iniciarConsumidor = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`Microservicio Correos: Esperando mensajes en '${QUEUE_NAME}'`);

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                console.log(`Recibida orden de correo para: ${data.clienteEmail}`);
                console.log("Data rabit correo")
                console.log(data)

                await registrarCorreo(data);

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error en RabbitMQ:', error.message);
        setTimeout(iniciarConsumidor, 5000);
    }
};

module.exports = { iniciarConsumidor };