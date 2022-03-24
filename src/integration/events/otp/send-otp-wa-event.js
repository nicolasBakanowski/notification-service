const MQService = require('../../MQService');
const OTP = require('../../../db/models/OTP')
const otpGenerator = require('otp-generator');
const { encode } = require("../../../libs/encryption")
const addMinutesToDate = require('../../../utils/addMinutesToDate')


const generateOTP =  () => {
  MQService.consumeToQueue('send-otp-wa-event', async (jsonMessage, ack) => {   
    const waNumber = waNumber.validate(jsonMessage)
    //GENERATE OTP
    const token = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    const now = new Date();
    const expirationTime = addMinutesToDate(now,10);
    //SAVE OTP TO DB
    const otp = await OTP.create({ otp: token, expirationTime: expirationTime })
    
    const details = {
      "timestamp": now, 
      "check": waNumber.to,
      "success": true,
      "message":"OTP sent to user",
      "otp_id": otp.id
    }
    
    const encoded = await encode(JSON.stringify(details))

    // MQService.publishToQueue('wa-notification-event', {body: otp, to: waNumber})
    
  }
)};

module.exports = generateOTP;