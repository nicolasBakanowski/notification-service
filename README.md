# ** SERVICIO DE NOTIFICACIONES **
## ** DESCRIPCION **
Este servicio va a cumplir la funcion de enviar notificaciones a traves de email, sms y whatsapp. Tambien generar un OTP para realizar logica de validacion de los 3 canales previamente mencionados.

## ** HERRAMIENTAS **

Para esto, se implementa una libreria llamada Notifire, que resuelve la integracion con varios servicios externos como por ejemplo SendGrid y Twilio (para email y celulares respectivamente), y tambien resuelve algo de abstraccion y modularizacion a traves de la posibilidad de configurar un 'Provider', 'Template' y 'Trigger'.

De todas formas, logicas para implementar un seguimiento de los estados de las notificaciones enviadas, y tambien para la generacion de codigos OTP para la validacion / verificacion de un canal **(email, sms y whatsapp)**, no las resuelve esta libreria.

- #### [Documentacion de Notifire](https://docs.notifire.co/docs/overview/introduction)

Para resolver esto, se configura el webhook correspondiente con el servicio con el que se esten implementando las notificaciones. En este caso, Twilio **(sms, whatsapp)** y SendGrid **(email)**.

- #### [Configurar webhook SMS a traves de Twilio API](https://www.twilio.com/docs/usage/webhooks/sms-webhooks)

- #### [Configurar webhook SMS a traves de Twilio ConsoleI](https://console.twilio.com/us1/service/sms/MG69c4f0b3ee743438c39558269ff24f7e/sms-service-instance-configure?frameUrl=%2Fconsole%2Fsms%2Fservices%2FMG69c4f0b3ee743438c39558269ff24f7e%3Fx-target-region%3Dus1)

- #### [Configurar webhook WhatsApp a traves de Twilio Sandbox for WhatsApp](https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Fsandbox%3Fx-target-region%3Dus1)


- #### [Configurar webhook Email a traves de SendGrid Mail Settings](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook)

## **DISEÑO**

El servicio esta pensado para que se comunique a traves de RabbitMQ con otros microservicios dentro de la misma infraestructura.

Es decir, que para lo unico que se va a exponer un endpoint, es para recibir las actualizaciones de los estados de las notificaciones enviadas a traves de un webhook del servicio de notificacion (de terceros) correspondiente.

Al utilzar la libreria Notifire, se permite un facil desacople de los servicios que se use para cada 'canal' de notificacion, en caso de querer ser reemplazado por otro. Y lo mismo se aplica a los templates de cada notificacion (que Notifire disponga)

### Canales (RabbitMQ)

- verify-wa-notification 

- verify-email-notification

- verfify-sms-notification
  >-  Recibe un numero de celular / email
  >-  Genera un OTP vinculado al numero / email y lo almacena en base de datos
  >-  Publica un evento al canal de 'send-wa-notification' para mandarle el codigo OTP a traves del canal correspondiente
---
- verify-otp
  >-  Valida que el otp recibido corresponda al registro que existe en el backend y se comunica con Account (??) para notificar que se vaido el numero/whatsapp/email del usuario correspondiente

---
- send-email-notification
  >-  Recibe una direccion de email, un subject y un body
  >-  Se instancia el **Provider** (notifire)
  >-  Se registra un template en funcion a los datos de entrada
  >-  A traves de la funcion **'trigger'** (notifire), se dispara el enviado del mensaje 
---
- send-sms-notification
- send-wa-notification
  >-  Recibe un numero de celular (to) y un mensaje (message)
  >-  Se instancia el **Provider** (notifire)
  >-  Se registra un template en funcion a los datos de entrada
  >-  A traves de la funcion **'trigger'** (notifire), se dispara el enviado del mensaje 
  >- test