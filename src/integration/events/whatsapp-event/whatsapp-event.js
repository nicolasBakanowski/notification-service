const MQService = require('../../MQService');
const sendMessage = require('./sendMessage')

const sendWhatsApp = () => {
  MQService.consumeToQueue('whatsapp-event', async (jsonMessage, ack) => {
    //const message = WAMessage(jsonMessage)
    ack();
    const response = await sendMessage()
    console.log(response)    
    /*
    {
      dateCreated,
      status,
      errorCode,
      errorMessage
    }
    */
    console.log('llega')

    //LOGICA DE ENVIADO DE MENSAJE
    // funcionPropiaDeEnviado(message) aca adentro va la logica del servicio externo
    
    //DEVOLVER MENSAJE DE CONFIRMACION AL SERVICIO QUE PIDIO EL REQUEST
  }
)};

module.exports = sendWhatsApp;