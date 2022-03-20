require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { TwilioSmsProvider } = require("@notifire/twilio");

const sendSms = async ( sms ) => {
  const notifire = new Notifire();
  
  await notifire.registerProvider(
    new TwilioSmsProvider({
      accountSid: process.env.TWILIO_ACCOUNT_SID,  
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.SMS_FROM
    })
  )

  try {
    const smsNotificationTemplate = await notifire.registerTemplate({
      id: "sms-notification",
      messages: [
        {
          channel: ChannelTypeEnum.SMS,
          template: `{{body}}`,
        },
      ],
    });

    try {
      await notifire.trigger("sms-notification", {
        $user_id: sms.to,
        $phone: sms.to,
        body: sms.body,
      });  
    } catch (err) {
      console.log(err, "ERROR 2")
    }  
  }catch (err) {
    console.log(err, "ERROR 1")
  }  
}  
module.exports = sendSms