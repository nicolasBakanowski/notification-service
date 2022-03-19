const MQService = require('../../MQService');

const generateOTP =  () => {
  MQService.consumeToQueue('send-otp-wa-event', async (jsonMessage, ack) => {
    //const waNumber = waNumber.validate(jsonMessage)
    //GENERATE OTP
    //SAVE OTP TO DB
    // MQService.publishToQueue('wa-notification-event', {body: otp, to: waNumber})
    
  }
)};

module.exports = generateOTP;