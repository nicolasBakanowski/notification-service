const MQService = require('../../MQService');
const sendSms = require('../../notifire/send-sms');
const smsSchema = require('../../../validations/sms.validation')


const smsNotification =  () => {
  MQService.consumeToQueue('sms-notification-event', async (jsonMessage, ack) => {
    const message = smsSchema.validate(jsonMessage)
    ack();
    if (message.error) { console.log("INPUT VALIDATION ERROR", message.error.details[0].message) } else {
      try {
        const response = await sendSms(message.value)
        console.log(response, "response")
      } catch (err) {
        console.log(err, "ERROR")
      }
    }
  }
)};

module.exports = smsNotification;