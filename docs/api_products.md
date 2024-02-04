### INDEX PRODUCT (WAJIB VERIVIKASI)

Endpoint: GET http://localhost:4000/api/product/index

message_success:

    {
        code: 200,
        message: 'data_product'
        data: {}
    }

message_failed:

    {
        code: 500,
        errors: 'Internal Server erorr'
    }

### CREATE PRODUCT

Endpoint: POST http://localhost:4000/api/product/createProduct

message_success:

    {
        code: 201,
        data: {
            titleProduct,
            subTitleProduct,
            priceProduct,
            imageProduct
        }
    }

message_failed: 

    {
        code: 401,
        erros: {}
    }

Validate:
    
    imageProduct:
        - size product harus kurang dari 5 MB
        - file harus ada , jika tidak return errors
        - extension yang diijinkan hanya :
            - .jpeg,
            - .png,
            - .jpg


### DELETE product

Endpoint: POST http://localhost:4000/api/product/deleteProduct/:idProduct

message_success:

    {
        code: 200,
        message: "OK"
    }
    
message_failed:

    {
        code: 404,
        errors: "Products NOt found"
    }
    

Validate: 

    - jika di hapus maka di database dan file gambar juga dihapus 
    - jika product not found maka kirim error
    
## Depedensi
    - express-fileupload