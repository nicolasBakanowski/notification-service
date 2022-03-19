const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const SmsSchema = Joi.object()
  .keys({    
    to: Joi.string().required().description('receiver wsp number'), 
    body: Joi.string().required().description('message body'),
    from: Joi.string().required().description('sender wsp number'),
  })
  .unknown()

module.exports = SmsSchema