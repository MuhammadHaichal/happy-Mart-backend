import express from "express"
import body_parser from "body-parser"
import usersRouter from './usersRouter.js'
import productRouter from './productRouter.js'
import Logging from '../logging.js'
import Verification from '../middleware/verification.js'

const app = express()
const bodyParser = body_parser.json()

//  PRODUCTS APPS
app.use('/product',Logging, Verification, bodyParser, productRouter)

//  AUTH USERS ROUTER
app.use('/users', Logging, bodyParser, usersRouter)

export default app
