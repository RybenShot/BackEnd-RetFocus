'use strict'

const mongoose = require('mongoose')

const PostSchema = require('./schemas/PostSchema')

const PostModel = mongoose.model('posts', PostSchema)

module.exports = PostModel
