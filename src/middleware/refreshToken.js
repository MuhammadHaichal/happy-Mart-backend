import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import usersModel from "../models/usersModel.js"

const RefreshToken = async (req, res, next) => {
	try {
		// get cookie from client, after login
		const cookie = req.cookies.refreshToken
        
		// if cookie not found or none on client
		if (!cookie) {
			return res.status(401).json({
				code: 401,
				errors: "unauthorize"
			})
		} else {
			const refreshTokenDb =
				await usersModel.findAll({
					where: {
						refreshToken: cookie
					}
				})

			// condition if refreshToken not match
			if (!refreshTokenDb) {
				return res.status(401).json({
					code: 401,
					errors: "unauthorize"
				})
			} else {
				jwt.verify(
					cookie,
					process.env.refreshToken,
					function (error, decode) {
						if (error)
							return res.status(401).json({
							    code: 401,
							    errors: "unauthorize"
							})
						else {
							// created new token
							const accessTokenNew =
								jwt.sign(
									{
										id: refreshTokenDb[0]
											.id,
										email: refreshTokenDb[0]
											.email
									},
									process.env
										.accessToken,
									{
										expiresIn:
											"120s"
									}
								)

							// send accessToken to client
							return res
								.status(200)
								.json({
									code: 200,
									accessToken:
										accessTokenNew
								})
						}
					}
				)
				next()
			}
		}
	} catch (error) {
		if (error) {
			return console.log(error)
		} else {
			return
		}
	}
}

export default RefreshToken
