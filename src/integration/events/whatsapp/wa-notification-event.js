const MQService = require('../../MQService');
const sendWhatsApp = require('../../notifire/send-wa');
const waSchema = require('../../../validations/wa.validation')

const whatsAppNotification = () => {
  MQService.consumeToQueue('whatsapp-event', async (jsonMessage, ack) => {
    const message = waSchema.validate(jsonMessage)
    ack();
    if (message.error) { console.log("INPUT VALIDATION ERROR", message.error.details[0].message) } else {
      try {
        const response = await sendWhatsApp(message.value)
        console.log(response, "response")
      } catch (err) {
        console.log(err, "err")
      }
    }
  }
)};

module.exports = whatsAppNotification;