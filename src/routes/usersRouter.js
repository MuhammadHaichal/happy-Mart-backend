import express from "express"
import body_parser from "body-parser"

import Register from "../controller/auth/register.js"
import Login from "../controller/auth/login.js"
import Logout from "../controller/auth/logout.js"
import RefreshToken from "../middleware/refreshToken.js"
import UsersValidate from "../middleware/usersValidate.js"


const usersRouter = express.Router()
const bodyParser = body_parser.json()


usersRouter.get("/token", RefreshToken)
usersRouter.post("/register", UsersValidate, Register)
usersRouter.post("/login", UsersValidate, Login)
usersRouter.post("/logout", Logout)

export default usersRouter
