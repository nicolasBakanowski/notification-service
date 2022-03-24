const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const email = Joi.object()
  .keys({    
    to: Joi.string().required().description('receiver wsp number'), 
    subject: Joi.string().required.description('subject email'),
    body: Joi.string().required().description('message body'),
    from: Joi.string().required().description('sender wsp number'),

  })
  .unknown()
module.exports = email