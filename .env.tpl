    #PUERTO EN EL QUE SE LEVANTARÁ EL SERVIDOR
PORT=3000
    #ruta accesible al usuario de la parte frontend
PUBLIC_DOMAIN=https://pizzadelicious.es

    #email al que se enviarán las nuevas solicitudes de contacto
ADMIN_EMAIL=unenmailcualquiera@hotmail.com
    #nombre del administrador
ADMIN_NAME=Sebastian
    #Asunto de los emails enviados con las nuevas solicitudes de contacto
MESSAGES_SUBJECT=Nueva solicitud de contacto desde Pizza Delicious

    #ruta a la plantilla (carpetas views) usado para el email de contacto
MESSAGES_EMAIL_TPL=emails/contact.html.tpl
    #ruta a la plantilla (carpetas views) usado para el email de bienvenida
WELLCOME_EMAIL_TPL=emails/wellcome.html.tpl
    #ruta a la plantilla (carpetas views) usado para el email de bienvenida
WELLCOME_SUBJECT=Bienvenido a Pizza Delicious 👻👻👻👻👻

    #DATOS CONEXIÓN MONGODB
DB_CONNECTION_STRING=mongodb+srv://UserRyben:<Contraseña>@rybenshot.qxw8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


#los siguientes campos no son necesarios salvo querer configurar un email propio para el envío de emails
#Servidor saliente correo electrónico
MAIL_STMP_HOST=
#Si el envío se hace mediante canal seguro (true/false)
MAIL_IS_SECURE=TRUE
#puerto de envío
MAIL_PORT=
#usuario del email
MAIL_USER=
#contraseña del email
MAIL_PASSWORD=

  #APP SECRET
APP_SECRET= <numero secreto>
