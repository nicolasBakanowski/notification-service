require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { TwilioSmsProvider } = require("@notifire/twilio");

const sendWhatsapp = async ( whatsapp ) => {
  const notifire = new Notifire();
  
  await notifire.registerProvider(
    new TwilioSmsProvider({
      accountSid: process.env.TWILIO_ACCOUNT_SID,  
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.WSP_FROM
    })
  )
  
  try {
    const whatsappNotificationTemplate = await notifire.registerTemplate({
      id: "whatsapp-notification",
      messages: [
        {
          channel: ChannelTypeEnum.SMS,
          template: `{{body}}`,
        },
      ],
    });

    try {
      await notifire.trigger("whatsapp-notification", {
        $user_id: whatsapp.to,
        $phone: whatsapp.to,
        body: whatsapp.body,
      });  
    } catch (err) {
      console.log(err, "ERROR 2")
    }  
  }catch (err) {
    console.log(err, "ERROR 1")
  }  
}  
module.exports = sendWhatsapp