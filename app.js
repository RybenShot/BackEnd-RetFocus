'use strict'

const express = require('express')
const database = require('./modules/database')
const cors = require("cors");
// MODULOS COMENTADOS PORQUE POR AHORA NO SE USARAN
// const nunjucks = require('nunjucks')
const bearerToken = require('express-bearer-token');

//middlewares con las rutas
const usersController = require('./controllers/UsersController')
const authController = require('./controllers/AuthController')
const postController = require('./controllers/PostController')
const mepostController = require('./controllers/MePostController')
// const meuserController = require('./controllers/MeUserController') Seguramente no lo necesite usar pero lo dejo POR SI ....





//server instance
const app = express()

// Parece ser que es para algo de token
app.use(bearerToken())
// Para poder usar la api, nose para qeu sirve exactamente
app.use(cors())

//middleware para parsear los cuerpos tipo application/JSON en el cuerpo
app.use(express.json())

//enganchamos los controladores de los diferentes recursos
app.use(usersController)
app.use(authController)
app.use(postController)
app.use(mepostController)
// app.use(meuserController) Comentado POR SI ...

// Conectamos a la base de datos de mongoDb
database.connect()

module.exports = app
