'use strict'

const express = require('express')
const router = express.Router()
const PostModel = require('../models/PostModel')

// Gracias a este consigo el token
const authMiddleware = require('../modules/authenticator')
// Volver a poner en true para que sea necesario iniciar sesion para postear
const userAccess = authMiddleware(true, ['user'])


router.route('/posts')
  .get(  async (req, res) => {
    try {
      const postList = await PostModel.find().sort({ created_at: 'DESC' }).exec()
      res.json(postList)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

  .post (userAccess, async (req, res) => {
    try {
      let newPost = req.body
      newPost.author = req.tokenData._id
      newPost = await new PostModel(newPost).save()

      res.status(201).json(newPost)
    } catch (error) {
      console.log("Debes iniciar sesion antes de hacer un post")
      res.status(500).json({ message: error.message })
    }
  })

module.exports = router
