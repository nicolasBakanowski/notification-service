require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { TwilioSmsProvider } = require("@notifire/twilio");

const sendSms = async ( sms ) => {
  const notifire = new Notifire();
  console.log('username', process.env.TWILIO_ACCOUNT_SID)
  
  await notifire.registerProvider(
    new TwilioSmsProvider({
      accountSid: process.env.TWILIO_ACCOUNT_SID,  
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: 'MG69c4f0b3ee743438c39558269ff24f7e'
    })
  )
  try {
    const passwordResetTemplate = await notifire.registerTemplate({
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
        $user_id: "<USER IDENTIFIER>",
        $phone: `${sms.to}`,
        body: sms.body,
      });  
    } catch (err) {
      console.log(err, "ERROR 2")
    }  
  }catch (err) {
    console.log(err, "ERROR 1")
  }  
}
  
sendSms({ body:"HOLA", to: "+543584379276", subject: "que es esto" })
module.exports = sendSms