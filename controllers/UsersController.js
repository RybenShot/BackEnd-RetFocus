'use strict'

const express = require('express');
const { sha512 } = require('js-sha512');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(); // Default is a 128-bit UID encoded in base58
const router = express.Router()
const config = require('../modules/config')

const authMiddleware = require('../modules/authenticator')
const userAccess = authMiddleware(true, ['user'])



// Autentificadores
// Para la creacion de usuarios no necesitamos ningun autentificador porque no tiene sentido, lo comento todo
// const authMiddleware = require('../modules/authenticator')
//True porque SI es necesario estar registrado
// const userAccess = authMiddleware(true, ['user'])


const userModel = require('../models/UserModel')

router.route('/users')
  .get(async (req, res) => {
    try {
      // Para limitar la respuesta de usuarios
      const limit = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit) : 50

      let userList = await userModel.find().sort({ name: 'ASC' }).limit(limit).exec()
      //procesar los datos que devolveré para quitar datos sensibles
      userList = userList.map((user) => {
        user = user.toJSON()
        delete user.password

        return user
      })

      res.json(userList)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  .post( async (req, res) => {
    let userData = req.body
    try {

      // Asignamos por defecto que el usuario es un usario normal
      userData.profile = "user"
      // Encriptamos la contraseña
      userData.password = sha512(userData.password)

      // esperamos que se guarde el usuario
      userData = await new userModel(userData).save()
      // Convertimos a Json- Nose pa que
      userData = userData.toJSON()
      delete userData.password

      res.status(201).json(userData)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })

  router.route('/users/:userId')
  .get(userAccess, async (req, res) => {
    try {
      const userId = req.params.userId

      if(userId !== req.tokenData._id && req.tokenData.profile === 'user'){
        res.status(404).json({ message: `Usuario con identificador ${userId} no encontrado.` })
        return
      }

      let foundUser = await userModel.findById(userId).exec()

      //early return
      if (!foundUser) {
        res.status(404).json({ message: `Usuario con identificador ${userId} no encontrado.` })
        return
      }
      foundUser = foundUser.toJSON()
      delete foundUser.password

      res.json(foundUser)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

module.exports = router
