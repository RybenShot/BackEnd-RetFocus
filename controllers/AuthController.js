'use strict'

const express = require('express')
const { sha512 } = require('js-sha512')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../modules/config')

const userModel = require('../models/UserModel')

router.route('/auth/login')
  .post(async (req, res) => {//Autentificacion de usuario
    const credentials = req.body//Capturamos el cuerpo del req ....

    credentials.password = sha512(credentials.password)//Ciframos la contraseña...
        //Encontramos a usuario por el email y el pw que ha dado el body...

    const foundUser = await userModel.findOne({email: credentials.email, password: credentials.password})
    console.info("API = he encontrado el usuario")

    if(!foundUser){//No lo ha encontrado? Error pa ti
      res.status(401).json({message: 'Usuario y/o contraseña no válidos.'})
      return//Y corto la ejecucion
    }

    // Si lo encuentra..
    // creamos el payload que va a ir enviado en el token
    let payload = {
      _id: foundUser._id,
      nickname: foundUser.nickName,
      email: foundUser.email,
      profile: foundUser.profile
    }//Podriamos pornerle mas parametros que tenga el usuario si queremos pero solo nos interesa estos...

    let token = await jwt.sign(payload, config.APP_SECRET, {//Unimos el "payload" junto al secreto que tiene la aplicacion para que este usuario pueda acceder cuando quiera
      expiresIn: "30 days"//Y encima le decimos que su cuenta va a cadurar en 30 dias...
      ////////Y todo esto habra generado el token de ese usuario
    })

    res.json({token: token})//Y devolvemos de repuesta el token del usuario
  })


  module.exports = router
