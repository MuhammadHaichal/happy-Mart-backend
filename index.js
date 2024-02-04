import express from "express"
import dotenv from 'dotenv'
import router from './src/routes/route.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cors from 'cors'

dotenv.config()
const app = express()
const corsOptions =  {
    origin: "http://localhost:3000"
}

// route app
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.static('public'))
app.use('/api', router)

// setting server development
app.listen(4000, err => {
	if (err) return console.log(err)
	else return console.log(`server running at 4000`)
})
