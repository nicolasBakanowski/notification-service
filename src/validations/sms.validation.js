const Joi = require('joi');

const smsSchema = Joi.object()
  .keys({    
    to: Joi.string().required().description('receiver wsp number'), 
    body: Joi.string().required().description('message body'),
  })
  .unknown()

module.exports = smsSchema