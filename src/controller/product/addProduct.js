import productModel from "../../models/productModel.js"
import path from "path"

const AddProduct = async (req, res) => {
	try {
		const {
			titleProduct,
			priceProduct,
			subTitleProduct
		} = req.body
		const file = req.files.image
		const fileName = file.name
		const fileSize = file.size
		const fileNameImg =
			file.md5 + path.extname(fileName)
		const fileUrlImg = `${
			req.protocol
		}://${req.get("host")}:/image/${fileNameImg}`

		// check if image is not found
		if (
			!file ||
			Object.keys(req.files).length === 0
		) {
			return res.status(400).json({
				code: 400,
				errors: "tidak ada gambar yang di upload !"
			})
		} else {
			// check file size
			if (fileSize > 3000000) {
				return res.status(400).json({
					code: 400,
					errors: "file gambar harus kurang dari 3 MB"
				})
			} else {
				//  storage image to folder public
				const storagePath = `./public/image/${fileNameImg}`

				file.mv(storagePath, err => {
					if (err) {
						return res
							.status(500)
							.send(err)
					} else {
						return
					}
				})

				// 	save data to database
				try {
					await productModel.create({
						titleProduct: titleProduct,
						subTitleProduct:
							subTitleProduct,
						imageNameProduct: fileNameImg,
						imageUrlProduct: fileUrlImg,
						priceProduct: priceProduct
					})

					return res.status(201).json({
						code: 201,
						message:
							"Berhasil Membuat Products",
						data: {
							titleProduct: titleProduct,
							subTitleProduct:
								subTitleProduct,
							imageNameProduct:
								fileNameImg,
							imageUrlProduct:
								fileUrlImg,
							priceProduct: priceProduct
						}
					})
				} catch (error) {
					if (error) {
						return error.errors.map(
							data => {
								res.status(400).json({
									code: 400,
									errors: data.message
								})
							}
						)
					} else {
						return
					}
				}
			}
		}
	} catch (error) {
		console.log(error)
	}
}

export default AddProduct
