//CREOQ EU ESTE CNTROLADOR NO LO USO

'use strict'

const express = require('express');
const router = express.Router()
const userModel = require('../models/UserModel')


const authMiddleware = require('../modules/authenticator')
const userAccess = authMiddleware(true, ['user'])


router.route('/me/users')
  .get(userAccess, (req, res) => {
    try {

      let UserData = req.token.user
      // const filterParams = {}

      if (req.tokenData.profile === 'user') {
        console.log("Hola, nose que estoy haciendo")
      }

      // console.log(filterParams)
      // let userList = await userModel.find(filterParams).exec()
      // //procesar los datos que devolveré para quitar datos sensibles
      // // userList = userList.map((user) => {
      // //   user = user.toJSON()
      // //   delete user.password

      // //   return user
      // // })

      res.json(UserData)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })




module.exports = router
