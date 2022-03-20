require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { SendgridEmailProvider } = require("@notifire/sendgrid");

const sendEmail = async ( email ) => {
  const notifire = new Notifire();

  await notifire.registerProvider(
    new SendgridEmailProvider({
      apiKey: process.env.SENDGRID_APIKEY,
      from: process.env.EMAIL_FROM,
    })
  );
  
  try {
    const passwordResetTemplate = await notifire.registerTemplate({
      id: "email-notification",
      messages: [
        {
          subject: email.subject,
          channel: ChannelTypeEnum.EMAIL,
          template: `{{ body }}`,
        },
      ],
    });

    try {
      await notifire.trigger("email-notification", {
        $user_id: "213",
        $email: email.to,
        body: email.body
      });
    } catch (err){
      console.log(err.response.body.errors, "ERROR 2")
    }
  } catch (err) {
    console.log(err, "ERROR 1")
  }  
}

module.exports = sendEmail
