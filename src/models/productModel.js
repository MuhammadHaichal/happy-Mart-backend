import { DataTypes } from "sequelize"
import sequelizeDb from "../database.js"

const productModel = sequelizeDb.define(
	"tb_products",
	{
		titleProduct: {
			type: DataTypes.STRING,
			min: 10,
			max: 30,
			allowNull: false,
			validate: {
				notNull: {
					msg: "nama products diperlukan"
				},
				notEmpty: {
					msg: "nama products tidak boleh kosong"
				}
			}
		},

		subTitleProduct: {
			type: DataTypes.STRING,
			allowNull: false,
			max: 255,
			validate: {
				notEmpty: {
					msg: "description products tidak boleh kosong"
				},
				notNull: {
					msg: "description products diperlukan"
				}
			}
		},

		imageNameProduct: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "nama images products tidak boleh kosong"
				},
				notNull: {
					msg: "nama images products diperlukan"
				}
			}
		},

		imageUrlProduct: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "images  products tidak boleh kosong"
				},
				notNull: {
					msg: "images products diperlukan"
				}
			}
		},

		priceProduct: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: {
					msg: "masukan harga dengan valid"
				}
			}
		}
	}
)

// for migrate to database
// productModel.sync({ force: true })

export default productModel
