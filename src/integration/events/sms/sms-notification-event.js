const MQService = require('../../MQService');
const sendSms = require('./send-sms-notification');
const smsSchema = require('../../../schemas/SmsSchema')


const smsNotification =  () => {
  MQService.consumeToQueue('sms-notification-event', async (jsonMessage, ack) => {
    const sms = smsSchema.validate(jsonMessage)
    ack();
    if (sms.error) { console.log("INPUT VALIDATION ERROR", sms.error.details[0].message) } else {
      try {
        const response = await sendSms(sms.value)
        console.log(response, "response")
      } catch (err) {
        console.log(err, "ERROR")
      }
    }
  }
)};

module.exports = smsNotification;