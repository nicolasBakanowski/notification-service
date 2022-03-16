const MQService = require('../../MQService');
const sendMessage = require('./sendMessage');
const wspValidation = require('../../../validations')


const sendWhatsApp =  () => {
  MQService.consumeToQueue('whatsapp-event', async (jsonMessage, ack) => {
    const message = wspValidation.validate(jsonMessage)
    if(message){
    ack();
    try {
      const response = await sendMessage()
      console.log(response, "response")
    } catch (err) {
      console.log(err, "err")
    }
 
  }}
)};

module.exports = sendWhatsApp;