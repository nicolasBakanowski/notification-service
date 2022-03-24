const MQService = require('../../MQService');
const sendEmail = require('../../notifire/send-email');
const emailSchema = require('../../../validations/email.validation')

const emailNotification =  () => {
  MQService.consumeToQueue('email-notification-event', async (jsonMessage, ack) => {
    const email = emailSchema.validate(jsonMessage)
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