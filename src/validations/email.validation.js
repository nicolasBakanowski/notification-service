const Joi = require('joi');

const emailSchema = Joi.object()
  .keys({    
    to: Joi.string().description('receiver wsp number').required(), 
    subject: Joi.string().description('subject email').required(),
    body: Joi.string().description('message body').required(),
    from: Joi.string().description('sender wsp number').required(),
  })
  .unknown()
module.exports = emailSchema