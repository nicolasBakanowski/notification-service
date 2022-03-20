require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { TwilioSmsProvider } = require("@notifire/twilio");

const sendSms = async (  ) => {
  const notifire = new Notifire();

  await notifire.registerProvider(
    new TwilioSmsProvider({
      accountSid: process.env.TWILIO_ACCOUNT_SID,  
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.SMS_FROM,
    })
  );
  
  try {
       const Send = await notifire.registeISmsOptionsrTemplate({
          to: '',
          channel: ChannelTypeEnum.SMS,
          content: `{{ body }}`,
        })
    }catch (err) {
    console.log(err, "ERROR 1")
  }  
}

module.exports = sendSms
