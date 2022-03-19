const MQService = require('../../MQService');
const sendMessage = require('./sendMessage');
const WspSchema = require('../../../validations/wspValidation')

const sendWhatsApp =  () => {
  MQService.consumeToQueue('whatsapp-event', async (jsonMessage, ack) => {
    const message = WspSchema.validate(jsonMessage)
    ack();
    if (message.error) { console.log("INPUT VALIDATION ERROR", message.error.details[0].message) } else {
      try {
        const response = await sendMessage(message.value)
        console.log(response, "response")
      } catch (err) {
        console.log(err, "err")
      }
    }
  }
)};

module.exports = sendWhatsApp;