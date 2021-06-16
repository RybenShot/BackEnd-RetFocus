//El Autentificador es como UN PORTERO DE DISCOTECA . Solo dejara pasar a los que se le ordenen

const jwt = require('jsonwebtoken')//Traemos la extension esta para usarla
const config = require('./config')//Traemos el config para usar el "APP_SECRET" del .env

//middleware autenticación
/*
Descripción: Queremos un middleware que corte el acceso y devuelva los errores típicos en función de la configuración

El middleware debe permitir:
1.- Configurar si se requiere obligatoriamente una sesión activa
2.- Listar que perfiles pueden llamar al método
3.- Lanzar errores en caso de producirse un problema al verificar/extraer el token
4.- Dejar los datos del token en la petición para su uso posterior
*/

module.exports = function authenticator(requiredSession, allowedProfiles = []) {

  return async (req, res, next) => {
    //capturamos el token en una variable...
    const token = req.token
    //metemos una nueva variable al "req" con un valor null para poder operar con el
    req.tokenData = null

    if (!token && !requiredSession) {//Si no tiene token y no requiere sesion...
      next()//Sigue la ejecucion(Pasa el control por asi decirlo)
      return//Corta la ejecucion para que no siga leyendo
    }

    try {
      if (!token && requiredSession) {//Si no tiene token y requiere sesion... Error pa ti
        res.status(401).json({ message: 'Debes iniciar sesión para llamar a este método' })
        return
      }

      if (token) {//Si tiene token, modificamos la variable de antes "tokenData" y verificamos que el token tiene el secreto de la aplicacion
        req.tokenData = await jwt.verify(token, config.APP_SECRET)
      }

      if (requiredSession && allowedProfiles.indexOf(req.tokenData.profile) === -1) {//Si requiere sesion ((Y como ha pasado los controles anteriores tambien requiere token)) mira si el perfil es igual a lo que se ha requerido anteriormente. Si no lo encuentra te dara de resultado -1 asi que te da un error...
        //POR EJEMPLO si se ha puesto ARRIBA en "allowedProfiles = ['admin']" si no eres admin te dara de resultado -1, de lo contrario te dara otro numero y te dejara pasar.
        res.status(403).json({ message: 'No tienes permisos suficientes para llamar a este método.' })
        return
      }

      //Si despues de todos los "obstaculos" anteriores no te ha parado esque , tienes los permisos necesarios

      next()//Y Sigue la ejecucion(Pasa el control por asi decirlo)
    } catch (error) {
      //Esto es por si ha pasado algo raro
      res.status(500).json({ message: error.message })
      return
    }
  }

}
