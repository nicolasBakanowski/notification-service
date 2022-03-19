const MQService = require('../../MQService');
const sendEmail = require('./send-email-notification');
const EmailSchema = require('../../../schemas/emailSchema')


const emailNotification =  () => {
  MQService.consumeToQueue('email-event', async (jsonMessage, ack) => {
    const email = EmailSchema.validate(jsonMessage)
    ack();
    if (message.error) { console.log("INPUT VALIDATION ERROR", message.error.details[0].message) } else {
      try {
        const response = await sendEmail(email.value)
        console.log(response, "response")
      } catch (err) {
        console.log(err, "err")
      }
    }
  }
)};

module.exports = emailNotification;