import usersModel from "../../models/usersModel.js"

const Logout = async (req, res) => {
	const cookie = req.cookies.refreshToken

	try {
		if (!cookie) {
			return res.status(401).json({
				code: 401,
				errors: "unauthorize"
			})
		} else {
			// find users category refreshToken
			const usersLogout =
				await usersModel.findAll({
					where: {
						refreshToken: cookie
					}
				})

			// if users not found
			if (!usersLogout) {
				return res.json(403).json({
					code: 403,
					errors: "Users Not Found"
				})
			} else {
				const usersId = usersLogout[0].id

				try {
					await usersModel.update(
						{
							refreshToken: null
						},
						{
							where: {
								id: usersId
							}
						}
					)
					
					res.clearCookie('refreshToken')
					res.sendStatus(200)
				} catch (error) {
					return res.sendStatus(401)
				}
			}
		}
	} catch (error) {
	    if (error) {
	        return res.sendStatus(500)
	    }
	    else {
	        return
	    }
	}
}

export default Logout