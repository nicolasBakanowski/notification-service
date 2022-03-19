require('dotenv').config()
const  { Notifire, ChannelTypeEnum } = require("@notifire/core") ;
const { SendgridEmailProvider } =require("@notifire/sendgrid");
const test = async () => {
  const notifire = new Notifire();
  
  
// Post hook usage
notifire.on('post:send', (data) => {
  const {
   id,
   channel,
   message,
   triggerPayload,
 } = data;
 console.log(data, "DATA")
});


  await notifire.registerProvider(
    new SendgridEmailProvider({
      apiKey: process.env.SENDGRID_APIKEY,
      from: "nicolasbakanowski@gmail.com",
    })
  );
  
  try {
    const passwordResetTemplate = await notifire.registerTemplate({
      id: "password-reset",
      messages: [
        {
          subject: "LEE ESTO",
          channel: ChannelTypeEnum.EMAIL,
          template: `
              Hi {{firstName}}!
              
              To reset your password click <a href="{{resetLink}}">here.</a>
              
              {{#if organization}}
                <img src="{{organization.logo}}" />
              {{/if}}
          `,
        },
      ],
    });

    try {
      await notifire.trigger("password-reset", {
        $user_id: "213",
        $email: "i.arzaut@itecriocuarto.org.ar",
        firstName: "Nacho",
        lastName: "Arzaut",
        resetLink: "https://example.com/reset-password?token=123",
        appName: "My App",
      });
    } catch (err){
      console.log(err.response.body.errors, "ERROR 2")
    }

  } catch (err) {
    console.log(err, "ERROR 1")
  }
  
  
  
  
}

test()
