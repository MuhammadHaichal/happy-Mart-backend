import jwt from "jsonwebtoken"

const Verification = (req, res, next) => {
	const Authorization = req.header("Authorization")
	const getToken =
		Authorization && Authorization.split(" ")[1]

	try {
		// if token is null
		if (getToken == null) {
			return res.status(401).json({
				code: 401,
				errors: "token dibutuhkan !"
			})
		} else {
			const verify = jwt.verify(
				getToken,
				process.env.accessToken,
				(error, decode) => {
					if (error) {
						// if token expired
						res.status(401).json({
						    code: 401,
							msg: "Token sudah kadaluwarsa, silakan Login Kembali"
						})
					} else {
						req.email = decode.email
						next()
					}
				}
			)
		}
	} catch (error) {
		return res.sendStatus(401)
	}
}

export default Verification
