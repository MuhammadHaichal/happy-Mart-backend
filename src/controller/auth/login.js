import jwt from "jsonwebtoken"
import usersModel from "../../models/usersModel.js"
import bcrypt from "bcryptjs"

const Login = async (req, res) => {
	const { email, password } = req.body

	try {
		// check email
		const matchEmail = await usersModel.findAll({
			where: {
				email: email
			}
		})
        
        // if email not found
		if (matchEmail.length === 0) {
			res.status(404)
			res.json({
				code: 404,
				errors: "Email tidak ditemukan !"
			})
		} else {
			// check password
			const matchPassword = await bcrypt.compare(
				password,
				matchEmail[0].password
			)

			// if password not match
			if (!matchPassword) {
				res.status(401)
				res.json({
					code: 401,
					errors: "Password salah !"
				})
			}
            
            // create accessToken 
			const accessToken = jwt.sign(
				{
					id: matchEmail[0].id,
					email: matchEmail[0].email
				},
				process.env.accessToken,
				{ expiresIn: "120s" }
			)
            
            // create refreshToken if accessToken is expires 
			const refreshToken = jwt.sign(
				{
					id: matchEmail[0].id,
					email: matchEmail[0].email
				},
				process.env.refreshToken,
				{
					expiresIn: "7d"
				}
			)
            
			const updateToken =
				await usersModel.update(
					{
						refreshToken: refreshToken
					},
					{
						where: {
							id: matchEmail[0].id
						}
					}
				)

			res.cookie("refreshToken", refreshToken, {
				expiresIn: "7d",
				httpOnly: true
			})

			res.json({ accessToken })
			
			
		}
	} catch (error) {
		if (error) {
			console.log(error)
		} else {
			return
		}
	}
}

export default Login
