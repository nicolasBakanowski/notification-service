const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3030),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    TWILIO_ACCOUNT_SID: Joi.string().description('id from service message'),
    TWILIO_AUTH_TOKEN: Joi.string().description('token from email service'),
    WSP_FROM: Joi.string().description('sender wsp number'), 
    SMS_FROM: Joi.string().description('sender sms number')
  })
  .unknown()