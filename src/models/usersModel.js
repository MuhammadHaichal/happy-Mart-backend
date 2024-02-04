import { DataTypes } from "sequelize"
import sequelizeDb from '../database.js'

const usersModels = sequelizeDb.define("tb_users", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		min: 5,
		max: 20,
		unique: {
			msg: "username sudah digunakan"
		},
		validate: {
			notNull: {
				msg: "username diperlukan"
			},
			notEmpty: {
				msg: "username tidak boleh kosong"
			},
			isAlphanumeric: {
				msg: "hanya alphaNumeric example: jhon123"
			}
		}
	},

	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: {
				msg: "masukan alamat email dengan benar !"
			}
		}
	},

	password: {
		type: DataTypes.TEXT,
		allowNull: false,
		min: 8
	},

	refreshToken: {
		type: DataTypes.TEXT,
		allowNull: true
	}
})

// for migrate to database
// usersModels.sync({ force: true })


export default usersModels
