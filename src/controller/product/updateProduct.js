import productModel from "../../models/productModel.js"
import path from "path"
import fs from "fs"

const UpdateProduct = async (req, res) => {
	try {
		const dataUpdate = await productModel.findOne({
			where: {
				id: req.params.idProduct
			}
		})

		// if dataUpdate id not found
		if (!dataUpdate) {
			return res.status(404).json({
				code: 404,
				errors: "data tidak diketahui"
			})
		} else {
			// check if image is not found
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(400).json({
					code: 400,
					errors: "tidak ada gambar yang di upload !"
				})
			} else {

				const file = req.files.image
				const fileSize = file.size
				const fileImageName = file.md5 + path.extname(file.name)
				const fileImageUrl = `${req.protocol}://${req.get("host")}/image/${fileImageName}`

				// check file size is calc BYTES TO MEGABYTES
				if (fileSize > 3000000) {
					return res.status(400).json({
						code: 400,
						errors: "file gambar harus kurang dari 3 MB"
					})
				} else {
					const filePath = "./public/image"

					// remove images old from storage
					fs.unlinkSync(`${filePath}/${dataUpdate.imageNameProduct}`)

					//  storage image to folder public
					const storagePath = `./public/image/${fileImageName}`

					file.mv(storagePath, err => {
						if (err) {
							return res.status(500).send(err)
						} else {
							console.log("images uploaded !")
						}
					})

					const { titleProduct, subTitleProduct, priceProduct } = req.body

					// save data to database
					const updateProduct = await productModel.update(
						{
							titleProduct: titleProduct,
							subTitleProduct: subTitleProduct,
							imageNameProduct: fileImageName,
							imageUrlProduct: fileImageUrl,
							priceProduct: priceProduct
						},
						{
							where: {
								id: req.params.idProduct
							}
						}
					)
					return res.status(200).json({
						code: 200,
						message: "berhasil updated product !",
						data: {
							titleProduct: titleProduct,
							subTitleProduct: subTitleProduct,
							imageNameProduct: fileImageName,
							imageUrlProduct: fileImageUrl,
							priceProduct: priceProduct
						}
					})
				}
			}
		}
	} catch (error) {
		// if errors
		return res.status(500).json({
			code: 500,
			errors: error
		})
	}
}

export default UpdateProduct
