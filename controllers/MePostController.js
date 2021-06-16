'use strict'

const express = require('express')
const router = express.Router()
const PostModel = require('../models/PostModel')

// Gracias a este consigo el token
const authMiddleware = require('../modules/authenticator')
// Volver a poner en true para que sea necesario iniciar sesion para postear
const userAccess = authMiddleware(true, ['user'])

router.route('/me/posts')
  .get( userAccess, async (req, res) => {
    try {
      const filterParams = {}

      if (req.tokenData.profile === 'user') {
        filterParams['author'] = req.tokenData._id
      }
      console.log(filterParams)
      const postList = await PostModel.find(filterParams).sort({ created_at: 'DESC' }).exec()

      res.json(postList)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

  module.exports = router
