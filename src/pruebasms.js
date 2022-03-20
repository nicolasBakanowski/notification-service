require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { TwilioSmsProvider } = require("@notifire/twilio");

const sendSms = async ( ) => {
  const notifire = new Notifire();
    console.log('username', process.env.TWILIO_ACCOUNT_SID)
  await notifire.registerProvider(
    new TwilioSmsProvider({
      accountSid: process.env.TWILIO_ACCOUNT_SID,  
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.SMS_FROM,
    })
  );
  
  try {
       const Send = await notifire.ISmsOptions({
          to: '',
          channel: ChannelTypeEnum.SMS,
          content: `{{ body }}`,
        })
    }catch (err) {
    console.log(err, "ERROR 1")
  }  
}

require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async () => {
  return client.messages.create({body:"addsas", from: process.env.SMS_FROM, to:'+543584379276'}) 
}
sendMessage()
module.exports = sendMessage