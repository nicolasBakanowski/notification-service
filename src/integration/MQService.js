require('dotenv').config();
const amqp = require('amqplib');

const CONN_URL = process.env.RABBITMQ;
let channel;

const MQService = module.exports;

const initialize = cb => {
  amqp.connect(CONN_URL)
    .then(conn => conn.createChannel())
    .then(ch => {
      channel = ch;
      cb();
      return null;
    })
    .catch(err => console.log(err));
};

MQService.publishToQueue = async (queueName, data) => {
  const msg = JSON.stringify(data);
  if (!channel)
    return initialize(() => channel.sendToQueue(queueName, Buffer.from(msg)));

  channel.sendToQueue(queueName, Buffer.from(msg));
};

MQService.consumeToQueue = async (queueName, cb) => {
  if (!channel)
    return initialize(() => {
      channel.assertQueue(queueName)
      .then(() => {
        channel.consume(queueName, msg => {
          const content = msg.content.toString();
          try {
            const obj = JSON.parse(content);
            const ack = () => channel.ack(msg);
            cb(obj, ack);
          } catch(err) {
            console.log(err);
            console.log(content);
            ack();
          };
          // console.log(`${new Date().getTime()} Saving message: ${content}`);
        });
      });
    });

  channel.consume(queueName, msg => {
    const content = msg.content.toString();
    try {
      const obj = JSON.parse(content);
      const ack = () => channel.ack(msg);
      cb(obj, ack);
    } catch(err) {
      console.log(err);
      console.log(content);
      ack();
    };
    // console.log(`${new Date().getTime()} Saving message: ${content}`);
  });
};

process.on('exit', (code) => {
   channel.close();
   console.log(`Closing rabbitmq channel`);
});
