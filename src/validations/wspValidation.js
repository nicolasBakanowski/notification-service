const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const WspSchema = Joi.object()
  .keys({    
    to: Joi.string().description('sender wsp number'), 
    body: Joi.string().description('message body')
  })
  .unknown()