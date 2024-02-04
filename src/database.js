import { Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config()

// connect to database mysql
const sequelizeDb = new Sequelize(
	process.env.database,
	process.env.username,
	process.env.password,
	{
		dialect: process.env.dialect,
		host: process.env.host,
		port: process.env.port
	}
)

export default sequelizeDb