// check users is login or not login
const UsersValidate = async (req, res, next) => {
	const cookie = req.cookies.refreshToken

	// if users is Not login or anonymouse users
	if (!cookie) {
		next()
	}
	//  if users is already login
	else {
		return res.status(400).json({
			code: 400,
			errors: "you already login, try logout in the account's"
		})
	}
}

export default UsersValidate
