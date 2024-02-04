import productModel from "../../models/productModel.js"


const IndexProduct = async (req, res) => {
	const Products = await productModel.findAll()
	
	try {
	    return res.status(200).json({
	        code: 200,
	        message: "OK",
	        data: {
	            Products
	        }
	    })
	} catch (error) {
	    if (error) {
	        return res.status(400).json({
	            code: 400,
	            errors: error
	        })
	    }
	}
}

export default IndexProduct