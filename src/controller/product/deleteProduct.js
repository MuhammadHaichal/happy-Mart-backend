import fs from "fs"
import productModel from "../../models/productModel.js"

const DeleteProduct = async (req, res) => {
	const IdProduct = req.params.idProduct

	// find product
	const findProduct = await productModel.findOne({
		where: {
			id: IdProduct
		}
	})

	// if product not found
	if (!findProduct) {
		return res.status(404).json({
			code: 404,
			errors: "product tidak ditemukan"
		})
	} else {
		const filePath = `./public/image`
		try {
			// remove image from database and file

			fs.unlinkSync(
				`${filePath}/${findProduct.imageNameProduct}`
			)
			await productModel.destroy({
				where: {
					id: findProduct.id
				}
			})

			return res.sendStatus(200)
		} catch (error) {
			console.log(error)
		}
	}
}

export default DeleteProduct
