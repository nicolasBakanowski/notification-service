const MQService = require('../../MQService');
const sendEmail = require('./send-email-notification');
const EmailSchema = require('../../../schemas/emailSchema')


const emailNotification =  () => {
  MQService.consumeToQueue('email-notification-event', async (jsonMessage, ack) => {
    const email = EmailSchema.validate(jsonMessage)
    ack();
    if (email.error) { console.log("INPUT VALIDATION ERROR", email.error.details[0].message) } else {
      try {
        const response = await sendEmail(email.value)
        console.log(response, "response")
      } catch (err) {
        console.log(err, "ERROR")
      }
    }
  }
)};

module.exports = emailNotification;