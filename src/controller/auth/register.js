import userModel from "../../models/usersModel.js"
import bcrypt from "bcryptjs"

const Register = async (req, res) => {
	try {
		const {
			username,
			email,
			password,
			repeatePassword
		} = req.body

		if (repeatePassword != password) {
			return res.status(400).json({
				code: 400,
				errors: "masukan password dengan valid !"
			})
		} else {
			const salt = bcrypt.genSaltSync(10)
			const hashPassword = bcrypt.hashSync(
				password,
				salt
			)

			const createUsers = await userModel.create(
				{
					username: username,
					email: email,
					password: hashPassword
				}
			)

			res.status(201).json({
			    message: 'berhasil membuat users',
			    code: 201
			})
		}
	} catch (err) {
		if (err) {
			return err.errors.map(data => {
				res.status(400)
				res.json({
					code: 400,
					message: 'bad request',
					errors: data.message
				})
			})
		} else {
			return
		}
	}
}

export default Register
