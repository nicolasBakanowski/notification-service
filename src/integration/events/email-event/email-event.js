const MQService = require('../../MQService');
const sendMessage = require('./sendMessage');
const EmailSchema = require('../../../schemas/emailSchema')


const sendEmail =  () => {
  MQService.consumeToQueue('email-event', async (jsonMessage, ack) => {
    const message = EmailSchema.validate(jsonMessage)
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

module.exports = sendEmail;